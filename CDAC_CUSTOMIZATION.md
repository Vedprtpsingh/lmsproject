# C-DAC Bangalore LMS Customization

## Overview
This LMS has been customized for **Centre for Development of Advanced Computing (C-DAC), Bangalore, India**.

---

## What Changed for C-DAC

### 1. Enums (Indian Academic Context)

**ProgramLevel** - C-DAC Specific Programs:
- PG Diploma
- Advanced PG Diploma  
- Certificate Course
- Short Term Course
- Professional Course
- Executive Program

**Batch** - C-DAC Intake Schedule:
- February Batch
- August Batch
- September Batch

**Center** - C-DAC Locations:
- C-DAC Bangalore ✅ (Primary)
- C-DAC Pune
- C-DAC Mumbai
- C-DAC Noida
- C-DAC Kolkata
- C-DAC Hyderabad
- C-DAC Thiruvananthapuram
- C-DAC Mohali

**Department** - C-DAC Domains:
- ACTS (Advanced Computing Training School)
- ESDM (Electronics System Design & Manufacturing)
- HPCE (High Performance Computing & Engineering)
- AAIMS (Advanced AI & Machine Learning Systems)
- Cyber Security
- Internet of Things
- VLSI Design
- Embedded Systems

**CourseType**:
- Core
- Elective
- Optional
- Lab ✅ (Added for C-DAC)
- Project ✅ (Added for C-DAC)

---

## Database Schema Changes

### Program Table - New Fields

```sql
ALTER TABLE programs ADD COLUMN center VARCHAR(100);
ALTER TABLE programs ADD COLUMN department VARCHAR(100);
```

**Fields:**
- `center` - Which C-DAC center offers this program
- `department` - ACTS, ESDM, HPCE, etc.

### CourseAllocation Table - Changed

**Old:** `semester` (1st Semester, 2nd Semester)  
**New:** `batch` (February Batch, August Batch, September Batch)

```sql
ALTER TABLE course_allocations RENAME COLUMN semester TO batch;
```

---

## Backend Changes

### Files Modified:

1. **Enums.java** ✅
   - Removed unused enums (PublishStatus, NodeType, etc.)
   - Added C-DAC specific enums

2. **Program.java** ✅
   - Added `center` field
   - Added `department` field

3. **ProgramDto.java** ✅
   - Added validation for C-DAC program levels
   - Added `center` and `department` fields

4. **ProgramService.java** ✅
   - Updated create/update/toResponse to include new fields

5. **CourseAllocation.java** ✅
   - Renamed `semester` → `batch`

6. **CourseAllocationDto.java** ✅
   - Changed validation for batches
   - Updated field names

7. **CourseAllocationService.java** ✅
   - Updated all references from semester to batch

---

## API Changes

### Programs API

**Request Body (Create/Update):**
```json
{
  "name": "PG Diploma in Advanced Computing",
  "code": "PGDAC",
  "level": "PG Diploma",
  "duration": "6 Months",
  "center": "C-DAC Bangalore",
  "department": "ACTS",
  "description": "...",
  "status": "Active"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "PG Diploma in Advanced Computing",
  "code": "PGDAC",
  "level": "PG Diploma",
  "duration": "6 Months",
  "center": "C-DAC Bangalore",
  "department": "ACTS",
  "coursesCount": 12,
  ...
}
```

### Course Allocation API

**Request Body:**
```json
{
  "lecturerId": 1,
  "courses": [
    {"courseCode": "ACTS01", "courseName": "Data Structures"},
    {"courseCode": "ACTS02", "courseName": "DBMS"}
  ],
  "session": "2024-2025",
  "batch": "February Batch"
}
```

---

## Frontend Changes Needed

### Pages to Update:

#### 1. AddProgram.jsx
- Change "Level" dropdown options to C-DAC program types
- Add "C-DAC Center" dropdown
- Add "Department" dropdown
- Update duration examples (6 Months, 1 Year instead of 4 Years)

#### 2. ProgramsList.jsx
- Display Center and Department columns
- Filter by center/department

#### 3. CourseAllocate.jsx
- Change "Semester" → "Batch"
- Update options: February Batch, August Batch, September Batch
- Update session format (current year format)

#### 4. CourseAllocation.jsx
- Display "Batch" instead of "Semester"
- Update column headers

#### 5. AddCourse.jsx
- Add "Lab" and "Project" to course type dropdown
- Update semester options (if needed for C-DAC structure)

---

## Validation Rules

### Program
- Code: 2-10 uppercase letters/numbers
- Level: Must be valid C-DAC program type
- Center: Optional, max 100 chars
- Department: Optional, max 100 chars

### Course Allocation
- Session: Format YYYY-YYYY (e.g., 2024-2025)
- Batch: Must be February/August/September Batch

---

## Sample Data for C-DAC

### Programs:
```
1. PG Diploma in Advanced Computing (PGDAC) - ACTS - 6 Months
2. PG Diploma in Big Data Analytics (PGDBDA) - ACTS - 6 Months
3. PG Diploma in IoT (PGDIOT) - IoT - 6 Months
4. PG Diploma in VLSI Design (PGDVLSI) - VLSI - 6 Months
5. PG Diploma in Embedded Systems (PGDES) - Embedded - 6 Months
6. Certificate in Cyber Security - Cyber Security - 3 Months
```

### Typical C-DAC Courses:
```
ACTS Courses:
- Core Java (ACTS01)
- Advanced Java (ACTS02)
- Data Structures (ACTS03)
- DBMS (ACTS04)
- Operating Systems (ACTS05)
- Web Technologies (ACTS06)
- Software Engineering (ACTS07)
- Project (ACTS08)
```

### Typical Batch Schedule:
```
February Batch: Feb - July
August Batch: Aug - Jan
September Batch: Sep - Feb
```

---

## Frontend Dropdown Values

### Level Options:
```javascript
const levelOptions = [
  "PG Diploma",
  "Advanced PG Diploma",
  "Certificate Course",
  "Short Term Course",
  "Professional Course",
  "Executive Program"
];
```

### Center Options:
```javascript
const centerOptions = [
  "C-DAC Bangalore",
  "C-DAC Pune",
  "C-DAC Mumbai",
  "C-DAC Noida",
  "C-DAC Kolkata",
  "C-DAC Hyderabad",
  "C-DAC Thiruvananthapuram",
  "C-DAC Mohali"
];
```

### Department Options:
```javascript
const departmentOptions = [
  "ACTS",
  "ESDM",
  "HPCE",
  "AAIMS",
  "Cyber Security",
  "Internet of Things",
  "VLSI Design",
  "Embedded Systems"
];
```

### Batch Options:
```javascript
const batchOptions = [
  "February Batch",
  "August Batch",
  "September Batch"
];
```

### Course Type Options:
```javascript
const courseTypeOptions = [
  "Core",
  "Elective",
  "Optional",
  "Lab",
  "Project"
];
```

---

## Migration Script

If you have existing data, run this SQL:

```sql
-- Add new columns to programs table
ALTER TABLE programs 
  ADD COLUMN center VARCHAR(100),
  ADD COLUMN department VARCHAR(100);

-- Rename semester to batch in course_allocations
ALTER TABLE course_allocations 
  RENAME COLUMN semester TO batch;

-- Update existing data (if any)
UPDATE programs 
SET center = 'C-DAC Bangalore', 
    department = 'ACTS' 
WHERE center IS NULL;

UPDATE course_allocations 
SET batch = 'February Batch' 
WHERE batch IN ('1st Semester', '2nd Semester');
```

---

## Next Steps

1. ✅ Backend updated for C-DAC
2. ⏳ Update frontend dropdowns
3. ⏳ Update form labels
4. ⏳ Add C-DAC branding (logo, colors)
5. ⏳ Add sample data seeder
6. ⏳ Test with C-DAC use cases

---

## C-DAC Specific Features to Add (Future)

1. **Fee Management** - Track course fees, payments
2. **Placement Module** - Track student placements
3. **Attendance** - Mark attendance for batches
4. **Exam Management** - Schedule exams, results
5. **Certificate Generation** - Auto-generate C-DAC certificates
6. **Student Portal** - View timetable, materials
7. **Alumni Tracking** - Track C-DAC alumni
8. **Project Submission** - Submit final projects

---

## Contact

**Organization:** Centre for Development of Advanced Computing (C-DAC)  
**Location:** Bangalore, Karnataka, India  
**Website:** https://www.cdac.in/

---

## Notes

- All terminology updated to match C-DAC standards
- Database schema enhanced for Indian academic system
- Validation rules match C-DAC program structure
- Ready for C-DAC Bangalore deployment
