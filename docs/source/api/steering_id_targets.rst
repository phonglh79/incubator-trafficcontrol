..
..
.. Licensed under the Apache License, Version 2.0 (the "License");
.. you may not use this file except in compliance with the License.
.. You may obtain a copy of the License at
..
..     http://www.apache.org/licenses/LICENSE-2.0
..
.. Unless required by applicable law or agreed to in writing, software
.. distributed under the License is distributed on an "AS IS" BASIS,
.. WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
.. See the License for the specific language governing permissions and
.. limitations under the License.
..

.. _to-api-steering-id-targets:

***************************
``steering/{{ID}}/targets``
***************************

``GET``
=======
Get all targets for a steering Delivery Service.

:Auth. Required: Yes
:Roles Required: None
:Response Type:  Array

Request Structure
-----------------
.. table:: Request Path Parameters

	+------+--------------------------------------------------------------------------------------------------+
	| Name |                Description                                                                       |
	+======+==================================================================================================+
	|  ID  | The integral, unique identifier of a steering Delivery Service for which targets shall be listed |
	+------+--------------------------------------------------------------------------------------------------+

.. table:: Request Query Parameters

	+--------+-----------------------------------------------------------------------------------------------------------------+
	|  Name  | Description                                                                                                     |
	+========+=================================================================================================================+
	| target | Return only the target mappings that target the Delivery Service identified by this integral, unique identifier |
	+--------+-----------------------------------------------------------------------------------------------------------------+

.. code-block:: http
	:caption: Request Structure

	GET /api/1.1/steering/2/targets?target=1 HTTP/1.1
	Host: trafficops.infra.ciab.test
	User-Agent: curl/7.47.0
	Accept: */*
	Cookie: mojolicious=...

Response Structure
------------------
:deliveryService:   The 'xml_id' of the steering Delivery Service
:deliveryServiceId: An integral, unique identifier for the steering Delivery Service
:target:            The 'xml_id' of this target Delivery Service
:targetId:          An integral, unique identifier for this target Delivery Service
:type:              The routing type of this target Delivery Service
:typeId:            An integral, unique identifier for the routing type of this target Delivery Service
:value:             The 'weight' attributed to this steering target

.. code-block:: http
	:caption: Response Example

	HTTP/1.1 200 OK
	Access-Control-Allow-Credentials: true
	Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Set-Cookie, Cookie
	Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE
	Access-Control-Allow-Origin: *
	Content-Type: application/json
	Set-Cookie: mojolicious=...; Path=/; HttpOnly
	Whole-Content-Sha512: utlJK4oYS2l6Ff7NzAqRuQeMEtazYn3rM3Nlux2XgTLxvSyslHy0mJrwDExSU05gVMdrgYCLZrZEvPHlENT1nA==
	X-Server-Name: traffic_ops_golang/
	Date: Tue, 11 Dec 2018 14:09:23 GMT
	Content-Length: 130

	{ "response": [
		{
			"deliveryService": "test",
			"deliveryServiceId": 2,
			"target": "demo1",
			"targetId": 1,
			"type": "HTTP",
			"typeId": 1,
			"value": 100
		}
	]}

``POST``
========
Create a steering target.

:Auth. Required: Yes
:Roles Required: Portal, Steering, Federation, "operations" or "admin"
:Response Type:  Object

Request Structure
-----------------
.. table:: Request Path Parameters

	+------+-------------------------------------------------------------------------------------------------+
	| Name |                Description                                                                      |
	+======+=================================================================================================+
	|  ID  | The integral, unique identifier of a steering Delivery Service to which a target shall be added |
	+------+-------------------------------------------------------------------------------------------------+

:targetId: The integral, unique identifier of a Delivery Service which shall be a new steering target for the Delivery Service identified by the ``ID`` path parameter
:typeId:   The integral, unique identifier of the routing type of the new target Delivery Service
:value:    The 'weight' which shall be attributed to the new target Delivery Service

.. code-block:: http
	:caption: Request Example

	POST /api/1.1/steering/2/targets HTTP/1.1
	Host: trafficops.infra.ciab.test
	User-Agent: curl/7.47.0
	Accept: */*
	Cookie: mojolicious=...
	Content-Length: 43
	Content-Type: application/json

	{
		"targetId": 1,
		"value": 100,
		"typeId": 1
	}

Response Structure
------------------
:deliveryService:   The 'xml_id' of the steering Delivery Service
:deliveryServiceId: An integral, unique identifier for the steering Delivery Service
:target:            The 'xml_id' of the newly added target Delivery Service
:targetId:          An integral, unique identifier for the newly added target Delivery Service
:type:              The routing type of the newly added target Delivery Service
:typeId:            An integral, unique identifier for the routing type of the newly added target Delivery Service
:value:             The 'weight' attributed to the new steering target

.. code-block:: http
	:caption: Response Example

	HTTP/1.1 200 OK
	Access-Control-Allow-Credentials: true
	Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Set-Cookie, Cookie
	Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE
	Access-Control-Allow-Origin: *
	Content-Type: application/json
	Set-Cookie: mojolicious=...; Path=/; HttpOnly
	Whole-Content-Sha512: +dTvfzrnOhdwAOMmY28r0+gFV5z+3aABI2FfAMziTYcU+pZrDanrJzMXpKWIL5Q/oCUBZpJDRt9hRCFkT4oGYw==
	X-Server-Name: traffic_ops_golang/
	Date: Mon, 10 Dec 2018 21:22:17 GMT
	Content-Length: 196

	{ "alerts": [
		{
			"text": "steeringtarget was created.",
			"level": "success"
		}
	],
	"response": {
		"deliveryService": "test",
		"deliveryServiceId": 2,
		"target": "demo1",
		"targetId": 1,
		"type": "HTTP",
		"typeId": 1,
		"value": 100
	}}
