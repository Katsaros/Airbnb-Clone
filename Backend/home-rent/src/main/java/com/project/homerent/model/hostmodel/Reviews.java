package com.project.homerent.model.hostmodel;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class Reviews {
    long totalReviews;
    double average;
    List<Integer> reviews;
}
