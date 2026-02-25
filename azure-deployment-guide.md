# Step-by-Step Guide: Deploying Containerized React App to Azure

This guide will walk you through deploying your containerized React application to **Azure Container Apps** using your $100 Student Developer Pack credit. We chose Azure Container Apps because it natively runs Docker containers, is extremely cost-effective (has a huge free tier), and supports custom domains.

## Prerequisites
1. An active **Azure Subscription** (Student Developer Pack).
2. A **Namecheap Domain** (e.g., `yourdomain.com`).
3. Your code pushed to **GitHub**.

---

## Step 1: Create the Azure Resources
We need two main resources: an Azure Container Registry (or GitHub Container Registry) and an Azure Container App. We will use GitHub Container Registry (GHCR) as it's free.

1. Go to the [Azure Portal](https://portal.azure.com).
2. Search for **Container Apps** in the top search bar and click it.
3. Click **Create**.
4. **Basics Tab**:
   - **Subscription**: Select your Azure for Students subscription.
   - **Resource Group**: Click "Create new" and name it `portfolio-rg`.
   - **Container App name**: Name it `portfolio-app`.
   - **Region**: Choose a region close to you (e.g., East US).
     > [!IMPORTANT]
     > **If you get a "RequestDisallowedByAzure" error later:** Your student subscription may restrict which regions you can use. See the Troubleshooting section below.
   - **Container Apps Environment**: Click "Create new", default settings are fine.
5. **Container Tab**:
   - Uncheck "Use quickstart image".
   - Name: `portfolio-container`
   - Image source: Choose **Other public registry** for now (we will deploy from GitHub Actions later).
   - Image and tag: `nginx:alpine` (just a placeholder so it deploys initially).
   - CPU and Memory: Select the lowest tier (0.25 vCPU, 0.5 GiB memory) to save your student credits!
6. **Ingress Tab**:
   - Enable Ingress.
   - **Virtual Network**: Leave "Use an existing private virtual network" **unchecked**.
   - Ingress traffic: **Accept traffic from anywhere**.
   - Target port: `80` (This matches our Dockerfile expose port).
7. Click **Review + Create**, then **Create**.

---

## Step 2: Set up GitHub Actions CI/CD to Azure
We need to give your GitHub Action permission to push to your Azure Container App.

1. **Create an Azure Service Principal**:
   - Open the **Azure Cloud Shell** (the terminal icon `>_` at the top right of the Azure portal). Choose Bash.
   - Run this command (replace `portfolio-app` and `portfolio-rg` if you used different names):
     ```bash
     az ad sp create-for-rbac --name "portfolio-app-sp" --role contributor --scopes /subscriptions/YOUR_SUBSCRIPTION_ID/resourceGroups/portfolio-rg --sdk-auth
     ```
   - *Note: Find your Subscription ID by searching "Subscriptions" in the portal.*
   - Copy the entire JSON output block.

2. **Add Secrets to GitHub**:
   - Go to your GitHub Repository -> **Settings** -> **Secrets and variables** -> **Actions**.
   - Click **New repository secret**.
   - Name: `AZURE_CREDENTIALS`
   - Value: Paste the JSON output from the previous step.
   - Click **Add secret**.
   - Also ensure you have read/write access to GitHub Packages (Settings -> Actions -> General -> Workflow permissions -> **Read and write permissions**).

3. Push your application to the `main` branch. This will trigger the `.github/workflows/deploy.yml` workflow, build the Docker container, and update your Azure Container App automatically!

---

## Step 3: Connect your Namecheap Domain

Now we will link your domain from Namecheap to the Azure Container App.

1. In the **Azure Portal**, go to your Container App (`portfolio-app`).
2. On the left menu under **Settings**, click on **Custom domains**.
3. Click **Add custom domain**.
4. In the pane that opens:
   - **Domain name**: Enter your domain (e.g., `www.yourdomain.com`).
   - Leave the validation type as **CNAME**.
   - Note the **Endpoint** and the **Domain validation Token (TXT)** provided by Azure.

5. **Configure Namecheap DNS**:
   - Log in to your Namecheap account.
   - Go to **Domain List** and click **Manage** next to your domain.
   - Go to the **Advanced DNS** tab.
   - Add two new records:
     1. **CNAME Record**:
        - Host: `www` (or `@` if supported but `www` is safer)
        - Value: `<Your Azure Container App Endpoint>` (e.g., `portfolio-app.xxxxxx.eastus.azurecontainerapps.io`)
        - TTL: Automatic
     2. **TXT Record**:
        - Host: `asuid.www`
        - Value: `<Your Domain Validation Token>`
        - TTL: Automatic
   - Save all changes (green checkmark).

6. **Validate in Azure**:
   - Wait 5-10 minutes for DNS to propagate.
   - Go back to the Azure Portal custom domain pane and click **Validate**.
   - Once validated, Azure allows you to configure an SSL certificate.
   - Select **Managed Certificate** (Free) so Azure automatically secures your site with HTTPS.
   - Click **Add**.

## Summary
You now have:
- A Dockerized React application.
- CI/CD via GitHub Actions that deploys every push automatically.
- A Namecheap custom domain linked to your Azure environment with auto-renewing SSL!

---

## Troubleshooting

### Error: `RequestDisallowedByAzure` (Region Disallowed)
If you see an error saying the resource was "disallowed by Azure" during creation, it means the region you selected is restricted by your Azure for Students policy.

**How to fix:**
1.  **Check Allowed Regions**: In the Azure Portal, search for **Policy** -> click **Assignments** -> look for **Allowed resource deployment regions**. Click it to see which regions are allowed for your account.
2.  **Try Common Regions**: If you don't want to check the policy, try deleting your failed attempt and recreating the resource in one of these commonly allowed regions for students:
    - **West US 2**
    - **North Europe**
    - **West Europe**
    - **West US 3**
3.  **Consistency**: Ensure the **Resource Group**, **Container App Environment**, and **Container App** are all in the *same* allowed region.

### Error: `DENIED: denied` (Registry Pull Error)
This happens when the image is public, but Azure is still trying to use old credentials.

**How to fix:**
1. In the left sidebar of your **Container App**, look under the **Application** group.
2. Click on **Revisions and replicas**.
3. Click the **+ Create new revision** button at the top.
4. Click on the container name in the list.
5. Change the **Registry type** (or Authentication) to **Public**.
6. Click **Save** at the bottom, then click the blue **Create** button.
7. Once the new revision is "Running", go back and add your custom domain.
