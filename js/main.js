(() => {

    // Create Components to Start

    const HomePageComponent = {
        template: "<h2>This is the home page</h2>"
    }

    const UsersPageComponent = {
        props: ['id'],
        template: "#userList",


        //encapsulate or isolate all component data
        data: function() {
            return{
                users: []
            }
        },

        created: function() {
            console.log('user component created');

            this.fetchUserData(this.id);
        },

        methods: {
            fetchUserData(user) {
                let url = `./includes/index.php?users=${this.id}`

                fetch(url)
                    .then(res => res.json())
                    .then(data => this.users = data)
                .catch(function(error) {
                    console.error(error);
                });
            }
        }
    }

    const ContactPageComponent = {
        template: "<h2>this is the contact page</h2>"
    }

    const ErrorPageComponent = {
        template: "<h2>Error! Page not found...</h2>"
    }


    const routes = [
        { path: '/', name: 'home', component: HomePageComponent }
        { path: '/contact', name: 'contact', component: ContactPageComponent }
        { path: '/users/:id', name: 'users', component: UsersPageComponent }
        { path: '/*', name: 'error', component: ErrorPageComponent }
    ]

    
    const router = new VueRouter ({
        routes
    });




    const vm = new Vue({
        el: '#app',

        data: {
            message: "sup from vue!"
        },

        created: function() {
            console.log('parent is live');
        },

        methods: {
            logParent(message) {
                console.log("from the parent", message);
            },

            logMainMessage(message) {
                console.log("called from inside a child, lives in the parent", message);
            }
        },

        components: {
            user: liveuser
        }
    })
})();