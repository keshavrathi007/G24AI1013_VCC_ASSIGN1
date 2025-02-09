# G24AI1013_VCC_ASSIGN1
Create and configure Multiple VM's using virtual Box and establish connection between them. Deploy this microservice based application across the connected VMs

# Step 1: Install VirtualBox and Create Multiple VMs
1.1 Install VirtualBox

    Download and install VirtualBox on your system.
    Install the VirtualBox Extension Pack for better functionality.

1.2 Create Multiple VMs

    Open VirtualBox and click "New" to create a new VM.
    Configure:
        Name: e.g., VM1, VM2
        Type: Linux
        Version: Ubuntu (or your preferred OS)
        Memory: Allocate at least 2GB RAM per VM.
        Hard Disk: Select "Create a Virtual Hard Disk Now", choose VDI, and allocate at least 20GB storage.
    Click Create and repeat the process for the second VM.

# Step 2: Configure Networking for VMs
2.1 Enable Internal Network for VM Communication

    Open VirtualBox, select a VM, and go to Settings > Network.

    Set Adapter 1 to:
        Attached to: NAT (for internet access)
        Adapter Type: Intel PRO/1000 MT Desktop

    Enable Adapter 2 for internal communication:
        Attached to: Internal Network
        Name: microservice-network
        Adapter Type: Intel PRO/1000 MT Desktop

    Repeat for the second VM.

    Boot both VMs, open the terminal, and check connectivity with:

    ping <VM2_IP>

# Step 3: Deploy a Microservice-Based Application
3.1 Install Required Packages
On Both VMs:

    Update package lists:

sudo apt update && sudo apt upgrade -y

Install Node.js and npm:

sudo apt install nodejs npm -y

Verify installation:

    node -v
    npm -v

3.2 Develop a Simple Microservice
On VM1 (Backend Service)

    Create a project folder:

mkdir backend && cd backend

Initialize a Node.js project:

npm init -y

Install Express.js:

npm install express

Create server.js with a simple REST API:

const express = require('express');
const app = express();
const port = 5000;

app.get('/api/message', (req, res) => {
    res.json({ message: "Hello from Backend Microservice!" });
});

app.listen(port, () => {
    console.log(`Backend service running on port ${port}`);
});

Start the service:

    node server.js

On VM2 (Frontend Service)

    Create a frontend directory:

mkdir frontend && cd frontend

Create index.js:

const http = require('http');

const options = {
    hostname: '<VM1_IP>',
    port: 5000,
    path: '/api/message',
    method: 'GET'
};

const request = http.request(options, response => {
    let data = '';
    response.on('data', chunk => { data += chunk; });
    response.on('end', () => { console.log(JSON.parse(data)); });
});

request.end();

Start the frontend service:

    node index.js

Step 4: Testing the Microservices
4.1 Fetch API from VM2 to VM1

On VM2, run:

node index.js

Expected output:

{ "message": "Hello from Backend Microservice!" }

4.2 Use Curl to Test API

From VM2, run:

curl http://<VM1_IP>:5000/api/message

Expected output:
{ "message": "Hello from Backend Microservice!" }
