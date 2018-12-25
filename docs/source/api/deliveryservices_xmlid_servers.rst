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

.. _to-api-deliveryservices-xml_id-servers:

***************************************
``deliveryservices/{{xml_id}}/servers``
***************************************
.. deprecated:: 1.1
	Use :ref:`to-api-deliveryserviceserver` instead

``POST``
========
Assigns cache servers to a Delivery Service.

:Auth. Required: Yes
:Roles Required: "admin" or "operations"\ [1]_
:Response Type:  Object

Request Structure
-----------------
.. table:: Request Path Parameters

	+--------+--------------------------------------------------------------------------------+
	| Name   | Description                                                                    |
	+========+================================================================================+
	| xml_id | The 'xml_id' of the Delivery Service whose server assignments are being edited |
	+--------+--------------------------------------------------------------------------------+

:serverNames: An array of hostname of cache servers to assign to this Delivery Service

.. code-block:: http
	:caption: Request Example

	POST /api/1.4/deliveryservices/test/servers HTTP/1.1
	Host: trafficops.infra.ciab.test
	User-Agent: curl/7.47.0
	Accept: */*
	Cookie: mojolicious=...
	Content-Length: 24
	Content-Type: application/json

	{ "serverNames": [ "edge" ] }

Response Structure
------------------
:xml_id:      The 'xml_id' of the Delivery Service to which the servers in ``serverNames`` have been assigned
:serverNames: An array of hostnames of cache servers assigned to Delivery Service identified by ``xml_id``

.. code-block:: http
	:caption: Response Example

	HTTP/1.1 200 OK
	Access-Control-Allow-Credentials: true
	Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Set-Cookie, Cookie
	Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE
	Access-Control-Allow-Origin: *
	Content-Type: application/json
	Set-Cookie: mojolicious=...; Path=/; HttpOnly
	Whole-Content-Sha512: zTpLrWiLM4xRsm8mlBQFB5KzT478AjloSyXHgtyWhebCv1YIwWltmkjr0HFgc3GMGZODt+fyzkOYy5Zl/yBtJw==
	X-Server-Name: traffic_ops_golang/
	Date: Tue, 20 Nov 2018 15:21:50 GMT
	Content-Length: 52

	{ "response": {
		"serverNames": [
			"edge"
		],
		"xmlId": "test"
	}}

.. [1] Users with the roles "admin" and/or "operation" will be able to edit the server assignments of *all* Delivery Services, whereas any other user will only be able to edit the server assignments of the Delivery Services their Tenant is allowed to edit.
