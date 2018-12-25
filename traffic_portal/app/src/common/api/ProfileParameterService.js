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

var ProfileParameterService = function(Restangular, httpService, messageModel, ENV) {

	this.unlinkProfileParameter = function(profileId, paramId) {
		return httpService.delete(ENV.api['root'] + 'profileparameters/' + profileId + '/' + paramId)
			.then(
				function() {
					messageModel.setMessages([ { level: 'success', text: 'Profile and parameter were unlinked.' } ], false);
				},
				function(fault) {
					messageModel.setMessages(fault.data.alerts, true);
				}
			);
	};

	this.linkProfileParameters = function(profileId, params) {
		return Restangular.service('profileparameter').post({ profileId: profileId, paramIds: params, replace: true })
			.then(
				function() {
					messageModel.setMessages([ { level: 'success', text: 'Parameters linked to profile' } ], false);
				},
				function(fault) {
					messageModel.setMessages(fault.data.alerts, false);
				}
			);
	};

	this.linkParamProfiles = function(paramId, profiles) {
		return Restangular.service('parameterprofile').post({ paramId: paramId, profileIds: profiles, replace: true })
			.then(
				function() {
					messageModel.setMessages([ { level: 'success', text: 'Profiles linked to parameter' } ], false);
				},
				function(fault) {
					messageModel.setMessages(fault.data.alerts, false);
				}
			);
	};

};

ProfileParameterService.$inject = ['Restangular', 'httpService', 'messageModel', 'ENV'];
module.exports = ProfileParameterService;
