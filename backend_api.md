# STJ Backend API Documentation

## Overview
This document provides comprehensive API documentation for the STJ (Security Talent Jobs) backend system. The API supports both employer and employee functionalities including job posting, candidate searching, bookmarking, and application management.

## Base URL
```
http://localhost:3000/api
```

## Authentication
Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 🔍 **CANDIDATE SEARCH & MANAGEMENT**

### 1. Find Candidates
**Endpoint:** `GET /api/user/find`

**Description:** Search for candidates matching specific job categories or keywords.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `keyword` (optional): Search keyword for candidate name, profession, or experience
- `category` (optional): Job category to filter candidates by profession
- `jobId` (optional): Job ID to automatically match candidates with job category

**Example Request:**
```javascript
// Search candidates for a specific job
GET /api/user/find?jobId=507f1f77bcf86cd799439011&page=1

// Search by category
GET /api/user/find?category=Security and Protection&keyword=security guard

// General search
GET /api/user/find?keyword=experienced&page=2
```

**Response:**
```json
{
  "data": [
    {
      "userId": "emp123",
      "profile": {
        "personalInformation": {
          "firstName": "John",
          "lastName": "Doe",
          "profession": "Security Guard",
          "contactNumber": "+1234567890"
        },
        "generalInformation": {
          "experience": [
            {
              "title": "Security Officer",
              "company": "ABC Security",
              "duration": "2 years"
            }
          ]
        }
      },
      "isVerified": true,
      "role": "employee",
      "favStatus": false,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 20
}
```

### 2. View Candidate Profile
**Endpoint:** `GET /api/user/profile/view`

**Description:** Get detailed profile information for a specific candidate.

**Query Parameters:**
- `userId` (required): The candidate's user ID

**Example Request:**
```javascript
GET /api/user/profile/view?userId=emp123
```

**Response:**
```json
{
  "Success": true,
  "message": "Candidate profile retrieved successfully",
  "data": {
    "userId": "emp123",
    "profile": {
      "personalInformation": {
        "firstName": "John",
        "lastName": "Doe",
        "profession": "Security Guard",
        "contactNumber": "+1234567890",
        "email": "john.doe@email.com",
        "dob": "1990-05-15",
        "gender": "Male",
        "nationality": "British"
      },
      "generalInformation": {
        "experience": [...],
        "skills": [...],
        "bio": "Experienced security professional..."
      },
      "uploads": {
        "resume": "https://...",
        "certificates": [...]
      }
    },
    "isVerified": true,
    "role": "employee",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-20T14:45:00Z"
  }
}
```

---

## ❤️ **FAVORITE CANDIDATES**

### 1. Toggle Favorite Status
**Endpoint:** `POST /api/favCandidate/favorite`

**Description:** Add or remove a candidate from favorites (toggle functionality).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "candidateId": "emp123"
}
```

**Response (Added to Favorites):**
```json
{
  "success": true,
  "message": "Candidate marked as favorite.",
  "data": {
    "_id": "fav_id_123",
    "employerId": "emp456",
    "candidateId": "emp123",
    "status": true,
    "createdAt": "2024-01-20T10:30:00Z"
  },
  "isFavorite": true
}
```

**Response (Removed from Favorites):**
```json
{
  "success": true,
  "message": "Candidate removed from favorites.",
  "isFavorite": false
}
```

### 2. Get Favorite Candidates
**Endpoint:** `GET /api/favCandidate/favorites`

**Description:** Retrieve all favorite candidates for the authenticated employer.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Favorite candidates retrieved successfully",
  "data": [
    {
      "favoriteId": "fav_id_123",
      "candidateId": "emp123",
      "profile": {
        "personalInformation": {
          "firstName": "John",
          "lastName": "Doe",
          "profession": "Security Guard"
        }
      },
      "isVerified": true,
      "role": "employee",
      "markedAsFavoriteAt": "2024-01-20T10:30:00Z"
    }
  ],
  "total": 5
}
```

---

## 🔖 **BOOKMARKS**

### 1. Toggle Bookmark Status
**Endpoint:** `POST /api/bookmark`

**Description:** Bookmark or unbookmark jobs and courses (toggle functionality).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "type": "job", // or "course"
  "referenceId": "job_id_123", // For jobs, this goes to jobId field
  "status": true // Optional, will be toggled automatically if not provided
}
```

**Response:**
```json
{
  "message": "job bookmark updated successfully",
  "bookmark": {
    "_id": "bookmark_id_123",
    "createdBy": "user123",
    "jobId": "job_id_123",
    "type": "job",
    "status": true,
    "createdAt": "2024-01-20T10:30:00Z",
    "updatedAt": "2024-01-20T10:30:00Z"
  }
}
```

### 2. Get User Bookmarks
**Endpoint:** `GET /api/bookmark`

**Description:** Retrieve all bookmarks for the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `type` (required): "job" or "course"

**Example Request:**
```javascript
GET /api/bookmark?type=job
```

**Response:**
```json
{
  "message": "Bookmarks retrieved successfully",
  "bookmarks": [
    {
      "_id": "job_id_123",
      "jobDetails": {
        "jobTitle": "Security Officer",
        "jobCategory": "Security and Protection",
        "companyDetails": {
          "companyName": "ABC Security Ltd"
        }
      },
      "createdBy": "emp456",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

## 💼 **JOB MANAGEMENT**

### 1. Create Job Post
**Endpoint:** `POST /api/job/job-posts`

**Description:** Create a new job posting.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "companyDetails": {
    "companyName": "ABC Security Ltd",
    "contactEmail": "hr@abcsecurity.com",
    "contactNumber": "+1234567890"
  },
  "jobDetails": {
    "jobTitle": "Security Officer",
    "jobCategory": "Security and Protection",
    "jobDescription": "We are looking for an experienced security officer...",
    "employmentType": "Full-Time",
    "city": "London",
    "state": "England",
    "country": "UK",
    "salary": {
      "amount": 35000,
      "frequency": "monthly"
    }
  },
  "jobRequirements": {
    "minimumExp": 1,
    "maximumExp": 5,
    "jobSkills": ["Security", "Customer Service", "First Aid"]
  },
  "workSchedule": {
    "startTime": "09:00",
    "endTime": "17:00",
    "startDate": "2024-02-01",
    "workingDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  }
}
```

### 2. Get All Job Posts
**Endpoint:** `GET /api/job/job-posts`

**Description:** Retrieve job posts with filtering and pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `keyword` (optional): Search keyword
- `category` (optional): Job category filter
- `experience` (optional): JSON string for experience range
- `salaryRange` (optional): JSON string for salary range
- `place` (optional): Location filter
- `sortBy` (optional): JSON string for sorting criteria

**Example Request:**
```javascript
GET /api/job/job-posts?page=1&category=Security and Protection&salaryRange={"minSalary":30000,"maxSalary":50000}
```

### 3. Update Job Status
**Endpoint:** `PUT /api/job/job-posts/:id/status`

**Description:** Update job status (active/completed).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "completed" // or "active"
}
```

### 4. Delete Job Post
**Endpoint:** `DELETE /api/job/job-posts/:id`

**Description:** Delete a job post (only if no applications exist).

**Headers:**
```
Authorization: Bearer <token>
```

---

## 📊 **DASHBOARD**

### Get Dashboard Data
**Endpoint:** `GET /api/dashboard`

**Description:** Get dashboard statistics for employers or employees.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Employer):**
```json
{
  "success": true,
  "userDashboard": {
    "userId": "emp456",
    "role": "employer",
    "credits": 18,
    "jobCreated": 15,
    "activeJobs": 8,
    "completedJobs": 7,
    "jobInvites": 25,
    "profileCompleted": 95
  },
  "statusCounts": [
    { "_id": "active", "count": 8 },
    { "_id": "completed", "count": 7 },
    { "_id": "pending", "count": 0 }
  ]
}
```

**Response (Employee):**
```json
{
  "success": true,
  "userDashboard": {
    "userId": "emp123",
    "role": "employee",
    "credits": 20,
    "jobCreated": 12, // Total applications
    "activeJobs": 3,  // Currently working jobs
    "completedJobs": 5, // Completed jobs
    "jobInvites": 8,
    "profileCompleted": 88
  }
}
```

---

## 🎯 **JOB APPLICATIONS**

### 1. Apply for Job
**Endpoint:** `POST /api/applyJob`

**Description:** Submit a job application/proposal.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "jobId": "job_id_123",
  "description": "I am interested in this position...",
  "bidAmount": 35000,
  "resume": "https://...",
  "coverLetter": "https://...",
  "specialist": "Security Management"
}
```

### 2. Get Job Applications
**Endpoint:** `GET /api/applyJob`

**Description:** Get applications for a specific job or user's applications.

**Query Parameters:**
- `jobId` (optional): Get applications for specific job
- `userId` (optional): Get applications by specific user

---

## 🔧 **ISSUES FIXED**

### 1. **findCandidate API Improvements:**
- ✅ Now properly filters candidates by job category when `jobId` is provided
- ✅ Enhanced search functionality with better keyword matching
- ✅ Added pagination metadata (total, page, limit)
- ✅ Improved filter logic for profession matching

### 2. **View Candidate API Fixes:**
- ✅ Fixed database query (using `findOne` instead of `findById`)
- ✅ Removed hardcoded dummy data
- ✅ Returns proper candidate profile structure
- ✅ Added proper error handling and validation

### 3. **Favorite Candidate API Enhancements:**
- ✅ Added toggle functionality (can add/remove favorites)
- ✅ Improved notification system
- ✅ Better error handling and response structure
- ✅ Fixed route definitions

### 4. **Bookmark API Improvements:**
- ✅ Already had toggle functionality
- ✅ Fixed import issues in routes
- ✅ Consistent response format

### 5. **Dashboard Calculation Fixes:**
- ✅ Fixed employer dashboard job counting logic
- ✅ Improved active/completed job calculations
- ✅ Enhanced employee dashboard date logic
- ✅ Added proper job status management

---

## 🚨 **IMPORTANT NOTES**

1. **Job Deletion Logic:** Jobs cannot be deleted if they have applications/proposals. This is intentional for data integrity.

2. **Credit System:** 
   - Employers start with 20 credits
   - 1 credit is deducted when creating a job
   - 1 credit is refunded when deleting a job (if no applications exist)

3. **Authentication:** All endpoints (except public ones) require valid JWT tokens.

4. **Error Handling:** All endpoints return consistent error response format:
```json
{
  "success": false,
  "message": "Error description"
}
```

5. **Pagination:** Most list endpoints support pagination with `page` parameter.

---

## 📱 **Frontend Integration Tips**

1. **State Management:** Use the `isFavorite` and `favStatus` fields to manage UI state for favorite/bookmark buttons.

2. **Real-time Updates:** The API returns current status, so you can update UI immediately after API calls.

3. **Error Handling:** Always check the `success` field in responses before processing data.

4. **Loading States:** Implement loading indicators for toggle operations (bookmark, favorite).

5. **Caching:** Consider caching candidate search results and dashboard data for better performance.

---

## 🔄 **API Response Standards**

### Success Response Format:
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... },
  "total": 100, // For paginated responses
  "page": 1,
  "limit": 20
}
```

### Error Response Format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information" // Optional
}
```

---

*This documentation is updated as of January 2024. For any questions or clarifications, please contact the backend team.*
