module.exports = function Channel(mod) {
	let currentChannel = 0

	// command
    mod.command.add(['ch', 'c'], (p) => {
		// change to specified channel
		if (!isNaN(p)) changeChannel(p)
		// change to next channel
		else if (['n'].includes(p)) changeChannel(currentChannel.channel + 1)
		// change to previous channel
		else if (['b'].includes(p)) changeChannel(currentChannel.channel - 1)
		else send(`Invalid argument. usage : ch (num)`);
	});

	// code
	mod.hook('S_CURRENT_CHANNEL', 2, (e) => { currentChannel = e });

	// helper
	// in case of dungeon/instance, return
	// if 0, let 0 be 10 for convenience
	// if same channel requested, return error message
	// channel index starts at 0, so decrement by 1
	function changeChannel(newChannel) {
		if (currentChannel.channel > 20) return
		if (newChannel == 0) newChannel = 10;
		if (newChannel == currentChannel.channel) {
			send(`Same channel selected.`);
			return
		}
		newChannel -= 1;
		mod.send('C_SELECT_CHANNEL', 1, {
			unk: 1,
			zone: currentChannel.zone,
			channel: newChannel
		});
	}

	function send(msg) { mod.command.message(`: ` + msg); }

}