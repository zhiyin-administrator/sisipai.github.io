const MyEvent = {
    data() {
        return {
            email: '',
            return_code: '',
            next_btn_able: false,
            user_code: '',
            out_date_time: 15,
            email: '',
            password: '',
            password_comfirm: '',
            phone_num: '',
            pet_name: '',
        }
    },
    methods: {
        connect_php(email) {
            if (email.length <= 32) {
                jQuery.ajax({
                    type: "POST",
                    url: "yanzhengma\\mail_ini.php",
                    dataType: 'json',
                    async: false,
                    data: {
                        Email: email,
                        my_email: '3144794112@qq.com',
                    },
                    success: function(data) {
                        if (data['error'] == '') {
                            return_data = data['code'];
                            // MyEvent.data.return_code = return_data;
                            alert('已经成功向' + email + '发送验证码，请查收！');
                            // console.log(MyEvent.data.return_code);
                            // console.log(MyEvent.data.user_code);
                        } else {
                            return_data = data['error'];
                        }
                    }
                });
                this.return_code = return_data;
                // console.log(this.return_code);
                let _this = this;
                setTimeout(function() {
                    // console.log('wuwu');
                    _this.jishi();
                }, 300000);
            } else {
                alert('输入邮箱太长或者有不合法字符！请重新输入')
            }
        },
        yanzheng() {
            if (this.user_code.length != 0 && this.user_code == this.return_code) {
                alert('邮箱验证成功！请继续输入内容');
                this.next_btn_able = true;
                // console.log(this.return_code);
                // console.log(this.user_code);
            } else if (this.user_code.length == 0) {
                alert('邮箱验证码为空！请输入验证码');
            } else {
                alert('邮箱验证码错误！请重新输入验证码');
                // this.return_code = '';
                // console.log(this.return_code);
                // console.log(this.user_code);
            }
        },
        jishi() {
            // console.log(this.return_code);
            // console.log('haha');
            this.return_code = '';
            // console.log(this.return_code);
        },
        return_to() {
            this.next_btn_able = false;
            this.return_code = '';
        },
        my_submit(email, pet_name, password, password_comfirm, phone_num) {
            if (email.length == 0) {
                alert('邮箱不得为空！');
            } else if (pet_name.length >= 32) {
                alert('昵称不能超过32位！请重新输入')
            } else if (pet_name.length == 0) {
                alert('昵称不能为空！')
            } else if (password != password_comfirm) {
                alert('两次输入密码不相同！');
            } else if (email.length >= 32) {
                alert("邮箱不能超过32位！请重新输入");
            } else if (password.length >= 32) {
                alert('密码过长！请重新输入');
            } else if (!this.next_btn_able) {
                alert('验证码不正确！');
            } else if (password.length < 6) {
                alert('密码不能小于6位！')
            } else {
                jQuery.ajax({
                    type: "POST",
                    url: "houduan\\register.php",
                    dataType: 'json',
                    async: false,
                    data: {
                        'email': email,
                        'pet_name': pet_name,
                        'password': password,
                        'phone_num': phone_num,

                    },
                    success: function(data) {
                        if (data['error'] == '') {
                            alert(data['msg']);
                            if (data['msg'] == '注册成功！') {
                                window.location.href = 'log.html';
                            }
                        } else {
                            return_data = data['error'];
                        }
                    }
                });
            }
        }
    },
}

const Event = Vue.createApp(MyEvent)
Event.mount('#yanzheng')