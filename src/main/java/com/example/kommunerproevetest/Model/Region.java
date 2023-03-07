package com.example.kommunerproevetest.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Region {

    @Id
    @Column(length = 4)
    private String kode;

    @OneToMany(mappedBy = "region")
    @JsonBackReference
    private Set<Kommune> kommuner = new HashSet<>();

    private String navn, href;

    public Region() {
    }

    public Region(String regionCode, String regionName, String href) {
        this.kode = regionCode;
        this.navn = regionName;
        this.href = href;
    }

    public Set<Kommune> getKommuner() {
        return kommuner;
    }

    public void setKommuner(Set<Kommune> kommuner) {
        this.kommuner = kommuner;
    }

    public String getKode() {
        return kode;
    }

    public void setKode(String regionCode) {
        this.kode = regionCode;
    }

    public String getNavn() {
        return navn;
    }

    public void setNavn(String regionName) {
        this.navn = regionName;
    }

    public String getHref() {
        return href;
    }

    public void setHref(String href) {
        this.href = href;
    }
}
