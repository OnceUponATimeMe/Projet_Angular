
//Declaration app
var myApp = angular.module('MyApplication', ['ngRoute','ngCookies']);


myApp.config(['$sceDelegateProvider', function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://free.currencyconverterapi.com/**'
    ]);
}]);


myApp.config(function ($routeProvider,$cookiesProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'main.htm',
            controller: 'mainController',

        })

        .when('/App1', {
            templateUrl: 'views/App1.html',
            controller: 'app1Controller'
        })

        .when('/App2', {
            templateUrl: 'views/App2.html',
            controller: 'app2Controller'
        })

        .when('/App3', {
            templateUrl: 'views/App3.html',
            controller: 'app3Controller'
        })

        .when('/App4', {
            templateUrl: 'views/App4.html',
            controller: 'app4Controller'
        })

        .when('/App5', {
            templateUrl: 'views/App5.html',
            controller: 'app5Controller'
        })
});

myApp.controller('mainController',[function () {
    //Pas de controlleur pour l'acceuil

}]);

myApp.controller('app1Controller',["$cookies",function($cookies) {
    /**
     * Created by Erwann on 24/01/2017.
     */
        var self=this;

        var favoriteCookie = $cookies.get('monCookie');

        this.message = favoriteCookie;
        //0 -> initial , 1 -> modifiée, 2 -> sauvegardée
        this.status = 1;
        this.info = "";


        this.save = function() {
            if(self.message != "")
            {
                // Setting a cookie
                $cookies.put('monCookie', self.message);
                self.info="Note sauvegardée";
                self.status=2;
            }

        };
        this.count = function() {
            var res = (100 - self.message.length);
            if(res == 100)
                self.status = 1;
            return res;
        };

        this.clear = function(value) {
            self.message ="";
            self.status = 1;
        };

        this.change = function(){
            self.status = 0;
            self.info = "Note modifiée";
        }

    }]);


myApp.controller('app2Controller',["$http", function($http) {

        var self=this;

        this.message="ok";

        this.promo;

        $http.get("data/promo.json")
            .then(function(response) {
                this.promo = response.data;
                console.log(self.promo);
            });




        this.services =

            [
                {"name": "Web Development",
                    "price": 300,
                    "active":true
                },{
                "name": "Design",
                "price": 400,
                "active":false
            },{
                "name": "Integration",
                "price": 250,
                "active":true
            },{
                "name": "Formation",
                "price": 220,
                "active":false
            }
            ];

        this.total = function()
        {
            var i = 0;

            var total = 0;

            for(i = 0; i < self.services.length; i++)
            {
                if(self.services[i].active == true)
                {
                    total = total + 1;
                }
            }

            return total;
        };

        this.toggleActive = function(service)
        {
            for(i = 0; i < self.services.length; i++)
            {
                if(self.services[i] == service)
                {
                    if(self.services[i].active == true)
                    {
                        self.services[i].active = false;
                    }
                    else
                        self.services[i].active = true;
                }
            }
        };

        this.prix = function()
        {
            var prix = 0;

            for(i = 0; i < self.services.length; i++)
            {
                if(self.services[i].active == true)
                {
                    prix = prix + self.services[i].price;
                }
            }

            return prix + ' $';
        }

        this.checkPromo = function(value)
        {
            for(pro in self.promo)
            {
                if(pro == value)
                {
                    return pro[value];
                }
            } return 0;
        }



    }]);


myApp.controller('app3Controller',["$http", function($http) {

        var self=this;

        $http.get("items.json")
            .then(function(response) {
                this.dispoItems = response.data;
            });

        this.test = "ok";

        this.dispoItems =

            [
                {
                    "url": "http://tutorialzine.com/2013/07/50-must-have-plugins-for-extending-twitter-bootstrap/",
                    "title": "50 Must-have plugins for extending Twitter Bootstrap",
                    "image": "http://cdn.tutorialzine.com/wp-content/uploads/2013/07/featured_4-100x100.jpg"
                },
                {
                    "url": "http://tutorialzine.com/2013/08/simple-registration-system-php-mysql/",
                    "title": "Making a Super Simple Registration System With PHP and MySQL",
                    "image": "http://cdn.tutorialzine.com/wp-content/uploads/2013/08/simple_registration_system-100x100.jpg"
                },
                {
                    "url": "http://tutorialzine.com/2013/08/slideout-footer-css/",
                    "title": "Create a slide-out footer with this neat z-index trick",
                    "image": "http://cdn.tutorialzine.com/wp-content/uploads/2013/08/slide-out-footer-100x100.jpg"
                },
                {
                    "url": "http://tutorialzine.com/2013/06/digital-clock/",
                    "title": "How to Make a Digital Clock with jQuery and CSS3",
                    "image": "http://cdn.tutorialzine.com/wp-content/uploads/2013/06/digital_clock-100x100.jpg"
                },
                {
                    "url": "http://tutorialzine.com/2013/05/diagonal-fade-gallery/",
                    "title": "Smooth Diagonal Fade Gallery with CSS3 Transitions",
                    "image": "http://cdn.tutorialzine.com/wp-content/uploads/2013/05/featured-100x100.jpg"
                },
                {
                    "url": "http://tutorialzine.com/2013/05/mini-ajax-file-upload-form/",
                    "title": "Mini AJAX File Upload Form",
                    "image": "http://cdn.tutorialzine.com/wp-content/uploads/2013/05/ajax-file-upload-form-100x100.jpg"
                },
                {
                    "url": "http://tutorialzine.com/2013/04/services-chooser-backbone-js/",
                    "title": "Your First Backbone.js App – Service Chooser",
                    "image": "http://cdn.tutorialzine.com/wp-content/uploads/2013/04/service_chooser_form-100x100.jpg"
                }
            ];

        this.includedItems = [];

        this.selectedDispoItems = [];

        this.step = 1;

        this.addAllToIncluded = function()
        {
            for(var index =0; index < self.dispoItems.length; index++)
            {
                self.includedItems.push(self.dispoItems[index]);
            }

            self.dispoItems = [];

        };

        this.addToIncluded = function(element)
        {
            self.includedItems.push(element);
        };

        this.removeFromIncluded = function()
        {

        };

        this.RemoveAllFromIncluded = function(value)
        {
            for(var index =0; index < self.includedItems.length; index++)
            {
                self.dispoItems.push(self.includedItems[index]);
            }

            self.includedItems = [];
        };



    }]);

    //tentative avec $scope
    myApp.controller("app4Controller",function($scope){

        $scope.contacts = [
            {
                "nom" : "ZUCKERBERG",
                "prenom" : "mark",
                "mail" : "mark@gacebook.com",
                "deleted" : false
            },{
                "nom" : "GATES",
                "prenom" : "bill",
                "mail" : "bill@microsoft.com",
                "deleted" : false
            },{
                "nom" : "JOBS",
                "prenom" : "steeve",
                "mail" : "Steeve@apple.com",
                "deleted" : false
            }
        ];
        $scope.filtered = $scope.contacts;

        $scope.filterContacts = function(){
            if($scope.inputFilter != ""){
                $scope.filtered = [];
                var ind = 0;
                for(var i=0;i<$scope.contacts.length;i++){
                    if(!$scope.contacts[i]["nom"].search($scope.inputFilter.toUpperCase())
                        || !$scope.contacts[i]["prenom"].toLowerCase().search($scope.inputFilter.toLowerCase())
                        || !$scope.contacts[i]["mail"].toLowerCase().search($scope.inputFilter.toLowerCase())){
                        $scope.filtered[ind] = $scope.contacts[i];
                        ind++;
                    }
                }
            }else{
                $scope.filtered = $scope.contacts;
            }
            $scope.calcNbContact();

        }

        $scope.nbContacts = $scope.contacts.length;

        $scope.deletedContacts = [];
        $scope.selectedContact;

        $scope.contact;
        $scope.tmpContact;
        $scope.operation;
        $scope.edit;

        $scope.toUpdate = function(contact){
            $scope.contact = contact;
            $scope.tmpContact = {};
            $scope.tmpContact["nom"] = contact["nom"];
            $scope.tmpContact["prenom"] = contact["prenom"];
            $scope.tmpContact["mail"] = contact["mail"];
            $scope.selectedContact = $scope.contacts.indexOf(contact);
            $scope.operation = "update";
            $scope.edit = true;
        }

        $scope.toAdd = function(){
            $scope.tmpContact= null;
            $scope.operation = "add";
            $scope.edit = true;
        }

        $scope.add = function(){
            $scope.tmpContact["deleted"]=false;
            $scope.contacts[$scope.contacts.length] = $scope.tmpContact;
            $scope.edit = false;
        }

        $scope.update = function(){
            $scope.contacts[$scope.selectedContact] = $scope.tmpContact;
            $scope.edit=false;
        }

        $scope.delete = function(contact){
            contact["deleted"] = true;
            $scope.nbDeleted = $scope.enableUndo();
            $scope.calcNbContact();
        }

        $scope.commit = function(){
            $scope.tmpContact.nom = $scope.tmpContact.nom.toUpperCase();
            if($scope.operation=="add"){
                $scope.add();
            }else{
                $scope.update();
            }
            $scope.calcNbContact();
            $scope.operation = "";
        }

        $scope.cancel = function(){
            $scope.tmpContact = null;
            $scope.operation = "";
        }

        $scope.nbDeleted = 0;
        $scope.enableUndo = function(){
            var tot = 0;
            for(var i=0;i<$scope.contacts.length;i++){
                if($scope.contacts[i].deleted){
                    tot++;
                }
            }
            return tot;
        }

        $scope.undoDelete = function(){
            for(var i=0;i<$scope.contacts.length;i++){
                if($scope.contacts[i].deleted){
                    $scope.contacts[i].deleted = false;
                }
            }
        }

        $scope.calcNbContact = function(){
            var tot = 0;
            for(var i=0;i<$scope.filtered.length;i++){
                if(!$scope.filtered[i].deleted){
                    tot++;
                }
            }
            $scope.nbContacts = tot;
        }
    })

        .directive("contactElem",function(){
            return {
                template: '<td>{{contact.nom}}</td><td>{{contact.prenom}}</td><td>{{contact.mail}}</td><td><i class="material-icons editButton" ng-click="toUpdate(contacts[$index])">mode_edit</i> <i class="material-icons deleteButton" ng-click="delete(contacts[$index])">delete</i></td>'
            };
        })

        .directive("frmContact",function(){
            return {
                template: '<input type="text" ng-model="tmpContact.nom" id="nom" placeholder="Entrez un nom..."/><input type="text" ng-model="tmpContact.prenom" id="prenom" placeholder="Prénom..."/><input type="text" ng-model="tmpContact.mail" id="mail" placeholder="Adresse mail..."/><button ng-click="commit()">Valider</button><button ng-click="cancel()">Annuler</button>'
            };
        })




    myApp.controller("app5Controller",['$scope','$http',function($scope,$http){

        $http.get('data/currencymap.json').then(function(data, status, headers, config) {
            $scope.currencies = data.data;
            $scope.from = data.data["EUR"];
            $scope.to = $scope.currencies["USD"];
        });

        $scope.what = 1;
        $scope.result;


        $scope.getResult = function(){
            $scope.show = true;
            $http.jsonp('https://free.currencyconverterapi.com/api/v3/convert?compact=y&q='
                +$scope.from.code+'_'+$scope.to.code, {jsonpCallbackParam: 'callback'}).then(function(response) {
                $scope.result=response.data[$scope.from.code+'_'+$scope.to.code].val * $scope.what ;
                //$scope.result= Math.round($scope.result * 100) / 100;
                $scope.show = false;
                $scope.addToHisto();
            });

        }



        $scope.swap = function(){
            var tmp = $scope.to;
            $scope.to = $scope.from;
            $scope.from = tmp;

            tmp = $scope.what;
            $scope.what = $scope.result;
            $scope.result = tmp;

        }

        // GESTION DE L'HISTORIQUE

        $scope.historique = [];
        $scope.alreadyHere = false;
        $scope.addToHisto = function(){



            // A FAIRE : regarder si la conversion a déjà été faite
            for(var i=0; i<$scope.historique.length ; i++){
                var histo = $scope.historique[i];
                if(histo.from.code == $scope.from.code && histo.to.code == $scope.to.code){
                    $scope.updateHisto(histo);
                    $scope.alreadyHere = true;
                }
            }

            //SINON :
            if($scope.alreadyHere){
                $scope.alreadyHere = false;
            }else{
                $scope.conversion = {};
                $scope.conversion.from = $scope.from;
                $scope.conversion.to = $scope.to;
                $scope.conversion.amount = $scope.result;
                $scope.conversion.initialAmount = $scope.result;
                $scope.conversion.delta = 0; // A changer après
                $scope.conversion.rate = $scope.result / $scope.what;
                $scope.conversion.what = $scope.what;
                $scope.conversion.date = new Date();
                $scope.conversion.update = false; //A passer true quand on refresh
                $scope.conversion.initialRate = $scope.result / $scope.what;

                $scope.historique[$scope.historique.length] = $scope.conversion;
            }


        }

        $scope.removeFromHisto = function(conversion){
            var index = $scope.historique.indexOf(conversion);
            if (index > -1) {
                $scope.historique.splice(index, 1);
            }

        }

        $scope.updateHisto = function(conversion){
            // On save l'index
            var ind = $scope.historique.indexOf(conversion);
            // Chargement des nouvelles valeurs
            conversion.update = true;
            $http.jsonp('https://free.currencyconverterapi.com/api/v3/convert?compact=y&q='
                +conversion.from.code+'_'+conversion.to.code, {jsonpCallbackParam: 'callback'}).then(function(response) {

                conversion.rate=response.data[conversion.from.code+'_'+conversion.to.code].val * 1;

            });
            conversion.amount = conversion.rate * conversion.what;
            conversion.delta = (conversion.initialRate - conversion.rate) * conversion.what;
            conversion.date = new Date();
            conversion.update = false;


            // Update dans l'array
            $scope.historique[ind] = conversion;
            $scope.alreadyHere = false;

        }



    }])

        .directive("convHisto",function(){
            return {
                template: 	'<td>{{conversion.from.code}}</td>' +
                '<td>{{conversion.to.code}}</td>' +
                '<td>{{conversion.rate}}</td>' +
                '<td>{{conversion.amount}}</td>' +
                '<td>{{conversion.date | date: "short"}}</td>' +
                '<td>{{conversion.delta}}</td>' +
                '<td> <i class="material-icons updateButton" ng-click="updateHisto(conversion)">refresh</i> <i class="material-icons deleteButton" ng-click="removeFromHisto(conversion)">delete</i> </td>'
            };
        });









