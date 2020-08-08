package com.toeic.entity;

public class Lesson {
    private int id;
    private String nameEnglish;
    private String nameVietnamese;

    public Lesson(int id, String nameEnglish, String nameVietnamese) {
        this.id = id;
        this.nameEnglish = nameEnglish;
        this.nameVietnamese = nameVietnamese;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNameEnglish() {
        return nameEnglish;
    }

    public void setNameEnglish(String nameEnglish) {
        this.nameEnglish = nameEnglish;
    }

    public String getNameVietnamese() {
        return nameVietnamese;
    }

    public void setNameVietnamese(String nameVietnamese) {
        this.nameVietnamese = nameVietnamese;
    }
}
