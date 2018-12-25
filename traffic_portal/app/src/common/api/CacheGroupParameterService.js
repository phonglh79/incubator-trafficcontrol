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

var CacheGroupParameterService = function(Restangular, messageModel, httpService, ENV) {

	this.getCacheGroupParameters = function(cachegroupId) {
		return Restangular.one('cachegroups', cachegroupId).getList('parameters')
	};

	this.unlinkCacheGroupParameter = function(cgId, paramId) {
		return httpService.delete(ENV.api['root'] + 'cachegroupparameters/' + cgId + '/' + paramId)
			.then(
				function() {
					messageModel.setMessages([ { level: 'success', text: 'Cachegroup and parameter were unlinked.' } ], false);
				},
				function(fault) {
					messageModel.setMessages(fault.data.alerts, true);
				}
			);
	};

	this.linkCacheGroupParameters = function(cgParamMappings) {
		return Restangular.service('cachegroupparameters').post(cgParamMappings)
			.then(
				function() {
					messageModel.setMessages([ { level: 'success', text: 'Parameters linked to cache group' } ], false);
				},
				function(fault) {
					messageModel.setMessages(fault.data.alerts, false);
				}
			);
	};

};

CacheGroupParameterService.$inject = ['Restangular', 'messageModel', 'httpService', 'ENV'];
module.exports = CacheGroupParameterService;
