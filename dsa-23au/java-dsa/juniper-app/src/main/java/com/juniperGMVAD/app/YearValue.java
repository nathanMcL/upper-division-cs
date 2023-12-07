package com.juniperGMVAD.app;

public class YearValue {
    public int year;
    public Double value;

    public YearValue(int year, Double value) {
        this.year = year;
        this.value = value;
    }

    public int getYear()
    {
        return year;
    }


    @Override
    public String toString() {
        return "(" + year + ", " + value + ")";
    }
}
