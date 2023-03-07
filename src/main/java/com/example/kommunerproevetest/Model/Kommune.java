package com.example.kommunerproevetest.Model;

import jakarta.persistence.*;

@Entity
public class Kommune {


    @Id
    @Column(length = 4)
    private String kode;

    private String navn, href;

    @ManyToOne
    @JoinColumn(name = "regionkode", referencedColumnName = "kode")
    private Region region;

    @Column(name = "photoSrc")
    private String photoSrc;

    public Kommune() {
    }

    public Kommune(String kode, String navn, String href, Region region) {
        this.kode = kode;
        this.navn = navn;
        this.href = href;
        this.region = region;
    }

    public String getPhotoSrc() {
        return photoSrc;
    }

    public void setPhotoSrc(String photoSrc) {
        this.photoSrc = photoSrc;
    }

    public String getKode() {
        return kode;
    }

    public void setKode(String kode) {
        this.kode = kode;
    }

    public String getNavn() {
        return navn;
    }

    public void setNavn(String navn) {
        this.navn = navn;
    }

    public String getHref() {
        return href;
    }

    public void setHref(String href) {
        this.href = href;
    }

    public Region getRegion() {
        return region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }
}
