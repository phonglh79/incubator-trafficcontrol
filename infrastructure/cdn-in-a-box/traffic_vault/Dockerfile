# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
FROM basho/riak-kv:ubuntu-2.2.3

EXPOSE 8087 8098

RUN rm -rfv /etc/riak/prestart.d/* /etc/riak/poststart.d/*

RUN echo 'APT::Install-Recommends 0;' >> /etc/apt/apt.conf.d/01norecommends \
 && echo 'APT::Install-Suggests 0;' >> /etc/apt/apt.conf.d/01norecommends \
 && apt-get update \
 && DEBIAN_FRONTEND=noninteractive apt-get install -y vim.tiny wget net-tools sudo net-tools ca-certificates unzip dnsutils \
 && rm -rf /var/lib/apt/lists/* && rm -rf /etc/apt/apt.conf.d/docker-gzip-indexes

ADD traffic_vault/prestart.d/* /etc/riak/prestart.d/
ADD traffic_vault/poststart.d/* /etc/riak/poststart.d/
ADD enroller/server_template.json \
    traffic_vault/run.sh \
    traffic_vault/sslkeys.xml \
    traffic_ops/to-access.sh \
    /

CMD /run.sh
