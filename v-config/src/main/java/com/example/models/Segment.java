package com.example.models;

import jakarta.persistence.*;

@Entity
@Table(name = "segment")
public class Segment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seg_id")
    private Integer id;

    @Column(name = "seg_name")
    private String segName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSegName() {
        return segName;
    }

    public void setSegName(String segName) {
        this.segName = segName;
    }
}
