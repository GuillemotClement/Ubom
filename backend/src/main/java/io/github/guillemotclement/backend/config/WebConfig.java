package io.github.guillemotclement.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
  @Override
  public void addCorsMappings(CorsRegistry registry){
    registry.addMapping("/**")
    .allowedOrigins("http://localhost:4200")
    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
    .allowedHeaders("*")
    .exposedHeaders("Set-Cookie")  // ⭐ Expose le header Set-Cookie
    .allowCredentials(true)  // ⭐ Très important
    .maxAge(3600);
  }
}
