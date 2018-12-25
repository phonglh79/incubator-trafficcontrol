/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var AuthService = function($rootScope, $http, $state, $location, $q, $state, httpService, userModel, messageModel, ENV) {

    this.login = function(username, password) {
        userModel.resetUser();
        return httpService.post(ENV.api['root'] + 'user/login', { u: username, p: password })
            .then(
                function(result) {
                    $rootScope.$broadcast('authService::login');
                    var redirect = decodeURIComponent($location.search().redirect);
                    if (redirect !== 'undefined') {
                        $location.search('redirect', null); // remove the redirect query param
                        $location.url(redirect);
                    } else {
                        $location.url('/');
                    }
                },
                function(fault) {
                    // do nothing
                }
            );
    };

    this.tokenLogin = function(token) {
        var deferred = $q.defer();

        userModel.resetUser();

        $http.post(ENV.api['root'] + "user/login/token", { t: token })
            .then(
                function() {
                    deferred.resolve();
                },
                function() {
                    deferred.reject();
                }
            );

        return deferred.promise;
    };

    this.logout = function() {
        userModel.resetUser();
        httpService.post(ENV.api['root'] + 'user/logout').
            then(
                function(result) {
                    $rootScope.$broadcast('trafficPortal::exit');
                    if ($state.current.name == 'trafficPortal.public.login') {
                        messageModel.setMessages(result.alerts, false);
                    } else {
                        messageModel.setMessages(result.alerts, true);
                        $state.go('trafficPortal.public.login');
                    }
                    return result;
                }
        );
    };

};

AuthService.$inject = ['$rootScope', '$http', '$state', '$location', '$q', '$state', 'httpService', 'userModel', 'messageModel', 'ENV'];
module.exports = AuthService;
