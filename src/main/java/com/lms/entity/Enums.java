package com.lms.entity;

/**
 * Enum definitions for C-DAC Bangalore LMS
 * Centre for Development of Advanced Computing - Bangalore, India
 */
public final class Enums {
    private Enums() {}

    /**
     * Status for Programs, Courses, and Faculty
     */
    public enum Status {
        ACTIVE("Active"),
        INACTIVE("Inactive");

        private final String displayName;

        Status(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    /**
     * Course type within a program (C-DAC specific)
     */
    public enum CourseType {
        CORE("Core"),
        ELECTIVE("Elective"),
        OPTIONAL("Optional"),
        LAB("Lab"),
        PROJECT("Project");

        private final String displayName;

        CourseType(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    /**
     * Program levels offered by C-DAC
     */
    public enum ProgramLevel {
        PG_DIPLOMA("PG Diploma"),
        PG_DIPLOMA_ADVANCED("Advanced PG Diploma"),
        CERTIFICATE("Certificate Course"),
        SHORT_TERM("Short Term Course"),
        PROFESSIONAL("Professional Course"),
        EXECUTIVE("Executive Program");

        private final String displayName;

        ProgramLevel(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    /**
     * Academic batches/sessions for C-DAC
     */
    public enum Batch {
        FEB("February Batch"),
        AUG("August Batch"),
        SEP("September Batch");

        private final String displayName;

        Batch(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    /**
     * C-DAC Centers in India
     */
    public enum Center {
        BANGALORE("C-DAC Bangalore"),
        PUNE("C-DAC Pune"),
        MUMBAI("C-DAC Mumbai"),
        NOIDA("C-DAC Noida"),
        KOLKATA("C-DAC Kolkata"),
        HYDERABAD("C-DAC Hyderabad"),
        THIRUVANANTHAPURAM("C-DAC Thiruvananthapuram"),
        MOHALI("C-DAC Mohali");

        private final String displayName;

        Center(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    /**
     * Department/Domain areas at C-DAC
     */
    public enum Department {
        ACTS("Advanced Computing Training School"),
        ESDM("Electronics System Design & Manufacturing"),
        HPCE("High Performance Computing & Engineering"),
        AAIMS("Advanced AI & Machine Learning Systems"),
        CYBER_SECURITY("Cyber Security"),
        IOT("Internet of Things"),
        VLSI("VLSI Design"),
        EMBEDDED("Embedded Systems");

        private final String displayName;

        Department(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }
}
