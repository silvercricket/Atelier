DROP DATABASE IF EXISTS reviews;
CREATE DATABASE reviews;

USE reviews;


CREATE TABLE reviews_list (
  id INT NOT NULL AUTO_INCREMENT,
  body VARCHAR(255) NOT NULL,
  summary VARCHAR(100) NOT NULL,
  helpfullness INT NOT NULL,
  reviewer_name VARCHAR(100) NOT NULL,
  response VARCHAR(255) NULL,
  reccomend BINARY NOT NULL,
  reviewer_email VARCHAR(255),
  product_id INT NOT NULL,
  date_ DATE NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE characteristics (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE characteristics_reviews (
  id INT NOT NULL AUTO_INCREMENT,
  review_id INT NOT NULL,
  characteristic_id INT NOT NULL,
  value INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (review_id) REFERENCES reviews_list(id),
  FOREIGN KEY (characteristic_id) REFERENCES characteristics(id)
);



CREATE TABLE pictures (
  id INT NOT NULL AUTO_INCREMENT,
  review_id INT NOT NULL,
  url VARCHAR(2000) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (review_id) REFERENCES reviews_list(id)
);


