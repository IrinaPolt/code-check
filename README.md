# code-check
## Stack
- Django
- React
- Docker-compose
- PostgreSQL
- Redis
- Celery
- Nginx
## Description
The system consists of the following modules:

1. **User Authentication and Registration Module**:
   
Users is able to register in the system using their email and password, as well as log in using these credentials.

2. **Code File Upload Module**:

Authenticated users can upload code files to the system. Information about the uploaded file is stored in the database, the file objects get the fields 'created_at' and 'updated_at'. Therefore, the files with the same values of the fields 'created_at' and 'updated_at' are new. Users can also delete or reload their files. Only files with the ".py" extension are allowed for upload.

3. **Code Compliance Check Module**:
   
Scheduled task automatically checks newly uploaded or overwritten code files for compliance with accepted coding standards (PEP8). After the check, a task sends an email notification to the user with information about the code review. A log of each check is stored in the database for every file in the user's file list.

4. **User Notification Email Module**:
   
The system processes task from the queue to send notification emails to users about the results of their code file checks. The fact of sending the notification is marked in the check logs.

5. **Report Module for Code Checks**:
   
The system provides an interface where users can view the results of performed code checks.

*Overall, this project involves implementing user authentication, secure file uploads, automated code compliance checks, email notifications, and a user interface for reviewing code check results.*

### .env pattern for database usage

```
SECRET_KEY=
DB_ENGINE=django.db.backends.postgresql
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DATABASE=postgres
DB_HOST=db
DB_PORT=5432
DEBUG=False
CELERY_BROKER_URL=redis://redis:6379/0
CELERY_RESULT_BACKEND=redis://redis:6379/0
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
REACT_APP_BACKEND_URL=http://host:80
```
### Launch

**.env file needs to be stored in the /infra/ directory**

```
git clone git@github.com:IrinaPolt/code-check.git
cd backend/infra/
docker-compose up --build
```

Migrations are performed automatically, while creating a superuser needs to be done manually.

```
docker exec -it <the container ID> python manage.py createsuperuser

```
To find out the container ID:

```
docker ps
```

### Endpoints

**Backend URLs**:
- **URL:** `/api/` - drf root. The detailed API schema will be accessible via the Swagger endpoint.
- **URL:** `/swagger/`
- **URL:** `/admin/` - django admin endpoint

**Frontend URLs**:
- **URL:** `/` - Login/signup
- **URL:** `/dashboard/` - Main page with file list
- **URL:** `/editprofile/` - Page for editing the user profile
