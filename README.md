# Deee_PKI
**Distributed Public Key Infrastructure which runs on HoloChain**
# About dpki:
To understand this application better. We are doing this in two parts.
* Key Management
* Identity Services

### Key Management

**Entries:**
* Agents/Users (perm_dpki_id, initial_public_key, shared_ID
  * This is the initial user that is created.
  * At this stage their is no revocation method that is declared. So we would have a default can be revoked by adding a new Key Entry which if it specifies a revocation method, must be revoked .

* Key Registration Entries (perm_agent_id, pub_key, shared_id, **revocation_Method_ID**)
 * This is used when the user decides which revocation method he uses.  

### Identity Services

**Note:** Design in progress

**Entries:**
* Identity Servers (network_type, address (IP or domain), port)

## Work Done
* The frame for the application is created.
* Created the User.
* Assigned the Key Registration for the User (For not the revocation method is set to 1 (i.e Revocation Key Method)).
* Signed the Key Registration.
* Default revocation method (Revocation Key)
* Test's for the user creation, keyReneration (updates) and Revocation key.
* Uses updatedAgent() and test.

## In Progress:
Focuses on the first part i.e. the **Key Management**
* Starting work on the M of N revocation Methord()

## Note TODO:
* The revocation method is hard coded to "1". This can be changed when the work on the UI is started. (The option to select which revocation method the user want has to be one of first thing that the user does before he can use the application)
