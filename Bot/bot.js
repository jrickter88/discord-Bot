var HashTable = require('node-hashtable');
fs = require('fs')
// import the discord.js module
const Discord = require('discord.js');

// Directory from which to load sound files. 
var LOADDIR = "C:\\discord\\bot\\audio\\"

var inVoice = 0;



//const guild = new Discord.id;

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();
var current_channel = undefined;
var output;

// the token of your bot - https://discordapp.com/developers/applications/me

var tokenfile = fs.readFileSync("./Token.txt").toString();

console.log(tokenfile + "   Is the tokenfile")
const token = tokenfile;
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}





  var patt = /star citizen/;
  

  
// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
  console.log('I am ready!');
  
  fs.readFile('./keys.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
   var hashkey = data;
  
  
  var sethashkey = hashkey.split(/\r?\n/);
  
	fs.readFile('./phrases.txt', 'utf8', function (err2,data2) {
  if (err2) {
    return console.log(err);
  }

  var hashphrase = data2;
  
  var sethashphrase = hashphrase.split(/\r?\n/);

  
  for (var i in sethashphrase){
	  
	  HashTable.set(sethashkey[i], sethashphrase[i]);
	 // console.log(sethashkey[i], sethashphrase[i]);
	  
  }
	
});

  
});

});


// create an event listener for messages
bot.on('message', message => {
	
	var username = message.author.username;
	var temp_id = message.author.id;

	console.log(message.author.id);
	console.log(message.content);



	message.content = (message.content).toLowerCase();
	var temp_mem = message.member;
	
	try 
	{
    var mem_id = message.member.voiceChannel.id;
	}
	
	catch(err)
	{
    var mem_id = undefined;
	}

	
	if (message.author.bot === true)
	{
		
		
		console.log('ignoring Bot');
	
	}
	
	if (message.channel.type == 'dm')
	{
		
		
		console.log('ignoring private message from::: ' + message.channel.recipient.username + ": message::: " + message.content);
		
	}
	else{
		
		
		try{
		//message content testing	
	//	console.log(message);
		
			if(temp_mem.hasPermission("NKVD"))
					
				{
					
				console.log("Permission granted");
	
					
		if (message.content === "&init")
		{
			
			current_channel = bot.channels.get('254127484843458563');
			
			current_channel.join();
			
			
		}
		if (message.content === "&join" && mem_id !== '254127484843458563') {
		current_channel = message.member.voiceChannel;
		console.log(message.member.voiceChannel.id);
		
			if (current_channel === undefined)
			{
			console.log("It called the if statement");
			}
			else{
			current_channel.join()
			}
			}
		
		
		if (message.content === "&gtfo" && current_channel != undefined){
			
			current_channel.leave();
			current_channel = undefined;
			
		}
		
		if (message.content === "&btfo" && inVoice === 0 && mem_id !== '254127484843458563' && message.member.voiceChannel != undefined) {

		console.log(message.member.voiceChannel.id);
		inVoice = 1;
		current_channel = message.member.voiceChannel;
		
		
		current_channel.join().then(connection => {
		var filePath = LOADDIR + "lol.mp3"
		const dispatcher = connection.playFile(filePath);
		console.log(filePath);
		
		dispatcher.on("end", end => {
                    // leave the channel and log in the console that it left the voice channel (for debugging purposes)
					if (current_channel == undefined)
					{
						
					}
					else{
                    current_channel.leave();
                    console.log("Left voice channel.");


                    // no longer in voice
                    inVoice = 0;
					}
                });
		
		
				});	

				
				

		// If the bot is connected to voice...
			
			// ...tell the user that you will play the file...
			
			//message.channel.sendMessage("look at this dude lol");
			
			// ...get the voice connection that is currently active...
			
			// ...get the path from which to load the file (the hardcoded directory
			// concatenated with the argument to the command)...
			
			// ...and play the file
			
			
		}
		
		
		//speech police begin
		var coolVar = message.cleanContent;
		var partsArray = coolVar.split(' ');
	
	
		console.log(message.author.username + '- ' + message.content);
	//	var lengtharray = partsArray.length;
	
	
		for (var i in partsArray)
			{
				
			output = HashTable.get(partsArray[i])
			
			if (output != null)
				{
					//message.channel.sendMessage(message);
				message.channel.sendMessage(output);
				}
			else
			{}
			}
	//speech police end
	
	
  
}
	}catch(err)
	{
		console.log(err)
	}
	}
	

	if (patt.test(message.content) === true) 
		
					{
					message.channel.sendMessage("Banning in 5");
					sleep(1000);
					message.channel.sendMessage("Banning in 4");
					sleep(1000);
					message.channel.sendMessage("Banning in 3");
					sleep(1000);
					message.channel.sendMessage("Banning in 2");
					sleep(1000);
					message.channel.sendMessage("Banning in 1");
					sleep(1000);
					message.channel.sendMessage("Banned, but not really because this is a test");
		
		
		}
	//ping function

	if (message.content === 'ping') {
    // send "pong" to the same channel.
    message.channel.sendMessage('pong');
	}





	
	
}
);

// log our bot in
bot.login(token);