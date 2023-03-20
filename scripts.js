var todos = [
    {
        text: "Learn HTML, CSS and Javascript",
        done: true
    },
    {
        text: "Learn the basics of Vue JS",
        done: false
    },    
];

//A la fin du projet, il faut supprimer var todos et mettre un tableau vide dans les data return
//a la place du window.todos.
//Cela aura pour conséquence qu'au rechargement de la page, nous n'ayons plus les données en dur ci dessus
//Mais, on peut les mettre lors de l'intégration du projet pour reussir à mieux s'organiser

const todosApp ={

    data(){
        return{
            todos: [],
            // todos: window.todos,

            newTodo : {
                //VueJs va automatiquement ajouter la propriété texte grace au v-model
                //mais on va avoir besoin de l'état. false sera l'état par défaut pour chaque newTodo
                done:false,
            },
        }
    },


    methods: {
        addTodo(){
            if (this.newTodo.text) {
                //si quelque est ecrit dans la case a ajouter, 
                //alors dans le tableau d'objet todos, on push la newTodo
                this.todos.push(this.newTodo);

                //on veut effacer le formulaire apres sa soumission
                this.newTodo = {
                    //on ne veut pas effacer l'element entier, on veut juste effacer la propriété text
                    done:false,
                };
                
                //on veut SAUVEGARDER avec setItem la nouvelle todo dans le localStorage clé/valeur
                //lors de l'ajout,la clé todos se met bien dans le LS mais this.todos renvoie un objet et on y a pas accès
                //Stringify() permet de convertir une valeur JavaScript en chaîne JSON.
                //on transforme donc cet obj en Json qui sera stocké comme une chaine avec JSON.stringify()
                localStorage.setItem("todos", JSON.stringify(this.todos)); 
                
            } else {
                alert("Vous n'avez rien écrit")                                
            }
        }

        //En cas de grosse application, on pourrait mettre la fonction storeTodo() avec à l'intérieur, la ligne de code qui est dans Updated
        //ça allègerait l'application qui se met actuellement à jour à chaque lettre tapée.
        // on mettrait cette fonction après chaque @click:
        // apres "addTodo();" ligne 40 / apres todos=[], ligne 37 et également, ligne 28 du code html.
    },

    //HOOK DE CYCLE DE VIE CREATED()
    //la methode created() pour configurer la propriété de données todos, 
    //ici on doit juste valider l'existence dans le LS alors on veut le charger dans notre ppt de données
    created(){
        //RAPPEL ! Quand on ajoute une todo dans le formulaire, on l'ajoute donc dans le formulaire avec une clé todos et un tableau d'objet.
        //grace a l'opérateur ternaire: on verifie qu'il y a bien une clé "todos" (grâce à la ligne 50) dans le LS
        //Si oui, on la convertit la chaine JSON en valeur javascript. Sinon on ne fait rien
        this.todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : this.todos
    },


    //HOOK DE CYCLE DE VIE UPDATED(): qui va se charger une fois que notre application (soit notre todolist) a été mise à jour 
    //Au rechargement de la page,les taches barrées car faites (avec done), redeviennent non barrées et donc non faites
    //on veut SAUVEGARDER avec setItem la nouvelle todo fraichement ajoutée dans le localStorage clé/valeur
    updated(){
        localStorage.setItem("todos", JSON.stringify(this.todos)); 
    }
}


//on monte l'application
Vue.createApp(todosApp).mount('#app');