package com.carparts.config;


import org.springframework.web.filter.CorsFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter(){
        CorsConfiguration config = new CorsConfiguration();


        config.setAllowCredentials(true);

        config.setAllowedOriginPatterns(List.of("*"));

        config.setAllowedHeaders(Arrays.asList(
                "Origin","Content-type", "Accept", "Authorization",
                "Access-Control-Allow-Origin", "Access-Control-Request-Method",
                "Access-Control-Request-Headers"
        ));

        config.setExposedHeaders(Arrays.asList(
                "Origin","Content-type", "Accept", "Authorization",
                "Access-Control-Allow-Origin","Access-Control-Allow-Credentials"
        ));


        config.setAllowedMethods(Arrays.asList(
                "GET", "POST", "PUT","DELETE", "OPTIONS", "PATHC"
        ));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}
