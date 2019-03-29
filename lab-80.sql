CREATE SCHEMA `items` DEFAULT CHARACTER SET utf8 ;

USE `items`;

CREATE TABLE `categories` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL
);

CREATE TABLE `place` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category_id` INT NULL,
  `place_id` INT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `image` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  INDEX `category_id_fk_idx` (`category_id` ASC),
  INDEX `fk_items_1_idx` (`place_id` ASC),
  CONSTRAINT `category_id_fk`
    FOREIGN KEY (`category_id`)
    REFERENCES `categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `place_id_fk`
    FOREIGN KEY (`place_id`)
    REFERENCES `place` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE);

INSERT INTO `categories` (`id`, `title`)
VALUES
	(1, 'Samsung'),
	(2, 'Apple'),
	(3, 'RedMi');

INSERT INTO `place` (`id`, `title`, `description`)
VALUES
	(4, 'SUM', 'Some description'),
	(5, 'GUM', 'Some description'),
	(6, 'Bishkek Park', 'Some description');

INSERT INTO `items` (`id`, `category_id`, `place_id`, `title`, `description`)
VALUES
	(4, 3, 5, 'Samsung S8', 'Some description'),
	(9, 1, 6, 'Apple 10', 'Some description'),
	(5, 2, 4, 'Redmi 10', 'Some description');
