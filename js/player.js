skidinc.player = {};
skidinc.player.username = 'kiddie';

skidinc.player.money = 0;
skidinc.player.totalMoney = 0;
skidinc.player.exp = 0;
skidinc.player.totalExp = 0;
skidinc.player.expReq = 100;
skidinc.player.level = 1;

skidinc.player.getTimeMult = function() {
    return skidinc.server.getEffects('telnet').time;
};

skidinc.player.getMoneyMult = function() {
    return skidinc.server.getEffects('web').money;
};

skidinc.player.getExpMult = function() {
    return skidinc.server.getEffects('web').exp;
};

skidinc.player.setUsernamePrefix = function() {
    $('body').append('<p id="username-width" style="display: none; font-size: 26px;">' + skidinc.player.username + '</p>');

    var usernameWidth = Math.floor($('#username-width').width());

    $('#username-width').remove();
    $('#input-session').html(skidinc.player.username);
    $('#command-input').css('width', 'calc(100% - 25px - 115px - ' + usernameWidth + 'px - 5px - 1px - 5px)');
};

skidinc.player.setUsername = function(args) {
    if (skidinc.tutorial.step == 0 && !skidinc.tutorial.finish) {
        if (args[0].length < 1)
            return skidinc.console.print('<x>ERR</x> put a valid username.');
        
        if (args[0].length > 12)
            return skidinc.console.print('<x>ERR</x> <b>' + args[0] + '</b> is too long (> 12 char).');
        
        $('body').append('<p id="username-width" style="display: none; font-size: 26px;">' + args[0] + '</p>');
        
        var usernameWidth = Math.floor($('#username-width').width());
        
        $('#username-width').remove();
        $('#input-session').html(args[0]);
        $('#command-input').css('width', 'calc(100% - 25px - 115px - ' + usernameWidth + 'px - 5px - 1px - 5px)');
        
        this.username = args[0];
        
        skidinc.console.print('Your new username is now <b>' + args[0] + '</b>.', function() {
            if (skidinc.tutorial.enabled)
                skidinc.tutorial.switchStep(1);
        });
    };
};

skidinc.player.earn = function(type, amount) {
    if (type == 'money') {
        this.money += amount;
        this.totalMoney += amount;
    };
    
    if (type == 'exp') {
        this.exp += amount;
        this.totalExp += amount;
        
        while (this.exp >= this.expReq) {
            this.level++;
            this.exp -= this.expReq;
            this.expReq = Math.floor(100 * Math.pow(1.5, this.level));
            skidinc.console.print('<z>LEVEL-UP!</z> You are now level <b>' + this.level + '</b>!');
        };
    };
};