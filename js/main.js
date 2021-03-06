var app = {

    findByName: function() {
        console.log('findByName');
        this.store.findByName($('.search-key').val(), function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    },

    initialize: function() {
        this.store = new MemoryStore();
        window.onload = function() {
        init({
            login_window: document.querySelector('#loginbox'),
            login_input: document.querySelector('#username'),
            login_submit: document.querySelector('#submit_user'),
            msginput: document.querySelector('#msg-input'),
            chat_view: document.querySelector('#msgs'),
            rooms: true,
            join_action: function(data) {
                if(data.room && !document.querySelector('#room-'+data.room)) {
                    var tmp = document.createElement('div');
                    tmp.id = 'room-'+data.room;
                    tmp.msg = document.createElement('div');
                    tmp.msg.className = 'msg';
                    tmp.users = document.createElement('div');
                    tmp.users.className = "users";
                    tmp.appendChild(tmp.msg);
                    tmp.msg.appendChild(tmp.users);
                    this.chat_view.appendChild(tmp);
                    this.chat_view.querySelector('.room.on').className = 'room off';
                    tmp.className = 'room on';
                } else if(data.room && document.querySelector('#room-'+data.room)) {
                    this.chat_view.querySelector('.room.on').className = 'room off';
                    this.chat_view.querySelector('#room-'+data.room).className = 'room on';
                }
                console.log("testme: "+data.users);
                for(var i in data.users) {
                    if(data.username != data.users[i]) {
                        this.user_join_action({room: data.room, username: data.users[i]});
                    }
                }
            },
            user_join_action: function(data) {
                var tmp = document.createElement('div');
                tmp.className = 'user '+data.username;
                tmp.innerHTML = data.username.substr(0, 1);
                tmp.namepop = document.createElement('div');
                tmp.namepop.className = 'name';
                tmp.namepop.innerHTML = data.username;
                tmp.appendChild(tmp.namepop);
                console.log(data);
                document.querySelector('#room-'+data.room).querySelector('.users').appendChild(tmp);
            },
            user_leave_action: function(data) {
                document.querySelector('.users').removeChild(document.querySelector('.users').querySelector('.'+data.username));
            },
            generate_msg: function(data) {
                generate_time = function(user) {
            var date = new Date();
                var time = date.getHours() + ':' + date.getMinutes();
                var add = document.createElement('div');
                add.className = "msg-box";
                add._title = document.createElement('div');
                add._title.className = "msg-title";
                add.time = document.createElement('time');
                add.user = document.createElement('div');
                add.user.profile = document.createElement('div');
                add.user.profile.className = 'profile';
                add.user.profile.innerHTML = user.substr(0, 1);
                add.user.appendChild(add.user.profile);
                add.user.className = "username";
                add.time.appendChild(document.createTextNode(time));
                add.user.appendChild(document.createTextNode(user));
                add._title.appendChild(add.time);
                add._title.appendChild(add.user);
                add.appendChild(add._title);
                return add;
          };
          var msg = generate_time(data.username);
                message = markdown.renderJsonML(markdown.toHTMLTree(data.message));
                msg.innerHTML += "<div class=\"msg-content\">" + message + "</div>";
                return msg;
      }
        });
document.querySelector('#loginbox').parentNode.parentNode.style.cssText = "position: fixed; z-index: 1; top: 0; bottom: 0; background: rgb(247, 247, 247); left: 0; right: 0;";
    }
    }

};

app.initialize();