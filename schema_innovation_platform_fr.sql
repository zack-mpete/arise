
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE=\'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION\';

-- -----------------------------------------------------
-- Schema plateforme_innovation
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `plateforme_innovation` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `plateforme_innovation` ;

-- -----------------------------------------------------
-- Table `plateforme_innovation`.`Utilisateurs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plateforme_innovation`.`Utilisateurs` (
  `utilisateur_id` INT NOT NULL AUTO_INCREMENT,
  `nom_utilisateur` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `mot_de_passe_hash` VARCHAR(255) NOT NULL,
  `role` ENUM(\'Entrepreneur\', \'Développeur\', \'Investisseur\', \'Administrateur\') NOT NULL,
  `score_confiance` DECIMAL(3,2) DEFAULT 0.00,
  `date_inscription` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`utilisateur_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `plateforme_innovation`.`Projets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plateforme_innovation`.`Projets` (
  `projet_id` INT NOT NULL AUTO_INCREMENT,
  `titre` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `statut` ENUM(\'En attente validation IA\', \'En attente validation Admin\', \'Validé\', \'Financé\', \'Rejeté\') DEFAULT \'En attente validation IA\',
  `date_soumission` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `entrepreneur_id` INT NOT NULL,
  `certificat_pi` VARCHAR(255) NULL COMMENT \'ID/Hash Blockchain pour la protection de la PI\',
  `date_validation_ia` TIMESTAMP NULL,
  `date_validation_admin` TIMESTAMP NULL,
  PRIMARY KEY (`projet_id`),
  INDEX `fk_Projets_Utilisateurs_idx` (`entrepreneur_id` ASC) VISIBLE,
  CONSTRAINT `fk_Projets_Utilisateurs`
    FOREIGN KEY (`entrepreneur_id`)
    REFERENCES `plateforme_innovation`.`Utilisateurs` (`utilisateur_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `plateforme_innovation`.`Opportunites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plateforme_innovation`.`Opportunites` (
  `opportunite_id` INT NOT NULL AUTO_INCREMENT,
  `titre` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `type_opportunite` ENUM(\'Appel à Projets\', \'Demande de Talents\') NOT NULL,
  `competences_requises` TEXT NULL,
  `investisseur_id` INT NOT NULL,
  `date_publication` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `statut` ENUM(\'Ouverte\', \'Fermée\', \'Pourvue\') DEFAULT \'Ouverte\',
  PRIMARY KEY (`opportunite_id`),
  INDEX `fk_Opportunites_Utilisateurs1_idx` (`investisseur_id` ASC) VISIBLE,
  CONSTRAINT `fk_Opportunites_Utilisateurs1`
    FOREIGN KEY (`investisseur_id`)
    REFERENCES `plateforme_innovation`.`Utilisateurs` (`utilisateur_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `plateforme_innovation`.`Commentaires`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plateforme_innovation`.`Commentaires` (
  `commentaire_id` INT NOT NULL AUTO_INCREMENT,
  `contenu` TEXT NOT NULL,
  `date_commentaire` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `utilisateur_id` INT NOT NULL,
  `projet_id` INT NULL,
  `opportunite_id` INT NULL,
  PRIMARY KEY (`commentaire_id`),
  INDEX `fk_Commentaires_Utilisateurs1_idx` (`utilisateur_id` ASC) VISIBLE,
  INDEX `fk_Commentaires_Projets1_idx` (`projet_id` ASC) VISIBLE,
  INDEX `fk_Commentaires_Opportunites1_idx` (`opportunite_id` ASC) VISIBLE,
  CONSTRAINT `fk_Commentaires_Utilisateurs1`
    FOREIGN KEY (`utilisateur_id`)
    REFERENCES `plateforme_innovation`.`Utilisateurs` (`utilisateur_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Commentaires_Projets1`
    FOREIGN KEY (`projet_id`)
    REFERENCES `plateforme_innovation`.`Projets` (`projet_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Commentaires_Opportunites1`
    FOREIGN KEY (`opportunite_id`)
    REFERENCES `plateforme_innovation`.`Opportunites` (`opportunite_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `plateforme_innovation`.`Evaluations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plateforme_innovation`.`Evaluations` (
  `evaluation_id` INT NOT NULL AUTO_INCREMENT,
  `score` TINYINT NOT NULL CHECK (`score` >= 1 AND `score` <= 5),
  `commentaire` TEXT NULL,
  `evalue_par_utilisateur_id` INT NOT NULL,
  `utilisateur_evalue_id` INT NOT NULL,
  `date_evaluation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`evaluation_id`),
  INDEX `fk_Evaluations_Utilisateurs1_idx` (`evalue_par_utilisateur_id` ASC) VISIBLE,
  INDEX `fk_Evaluations_Utilisateurs2_idx` (`utilisateur_evalue_id` ASC) VISIBLE,
  CONSTRAINT `fk_Evaluations_Utilisateurs1`
    FOREIGN KEY (`evalue_par_utilisateur_id`)
    REFERENCES `plateforme_innovation`.`Utilisateurs` (`utilisateur_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Evaluations_Utilisateurs2`
    FOREIGN KEY (`utilisateur_evalue_id`)
    REFERENCES `plateforme_innovation`.`Utilisateurs` (`utilisateur_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `plateforme_innovation`.`Signalements`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plateforme_innovation`.`Signalements` (
  `signalement_id` INT NOT NULL AUTO_INCREMENT,
  `raison` TEXT NOT NULL,
  `date_signalement` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `utilisateur_signalant_id` INT NOT NULL,
  `projet_signale_id` INT NULL,
  `commentaire_signale_id` INT NULL,
  `statut` ENUM(\'En attente\', \'Résolu\', \'Rejeté\') DEFAULT \'En attente\',
  `administrateur_id` INT NULL,
  PRIMARY KEY (`signalement_id`),
  INDEX `fk_Signalements_Utilisateurs1_idx` (`utilisateur_signalant_id` ASC) VISIBLE,
  INDEX `fk_Signalements_Projets1_idx` (`projet_signale_id` ASC) VISIBLE,
  INDEX `fk_Signalements_Commentaires1_idx` (`commentaire_signale_id` ASC) VISIBLE,
  INDEX `fk_Signalements_Utilisateurs2_idx` (`administrateur_id` ASC) VISIBLE,
  CONSTRAINT `fk_Signalements_Utilisateurs1`
    FOREIGN KEY (`utilisateur_signalant_id`)
    REFERENCES `plateforme_innovation`.`Utilisateurs` (`utilisateur_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Signalements_Projets1`
    FOREIGN KEY (`projet_signale_id`)
    REFERENCES `plateforme_innovation`.`Projets` (`projet_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Signalements_Commentaires1`
    FOREIGN KEY (`commentaire_signale_id`)
    REFERENCES `plateforme_innovation`.`Commentaires` (`commentaire_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Signalements_Utilisateurs2`
    FOREIGN KEY (`administrateur_id`)
    REFERENCES `plateforme_innovation`.`Utilisateurs` (`utilisateur_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `plateforme_innovation`.`Etiquettes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plateforme_innovation`.`Etiquettes` (
  `etiquette_id` INT NOT NULL AUTO_INCREMENT,
  `nom_etiquette` VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (`etiquette_id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `plateforme_innovation`.`Projets_Etiquettes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plateforme_innovation`.`Projets_Etiquettes` (
  `projet_id` INT NOT NULL,
  `etiquette_id` INT NOT NULL,
  PRIMARY KEY (`projet_id`, `etiquette_id`),
  INDEX `fk_Projets_Etiquettes_Etiquettes1_idx` (`etiquette_id` ASC) VISIBLE,
  CONSTRAINT `fk_Projets_Etiquettes_Projets1`
    FOREIGN KEY (`projet_id`)
    REFERENCES `plateforme_innovation`.`Projets` (`projet_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Projets_Etiquettes_Etiquettes1`
    FOREIGN KEY (`etiquette_id`)
    REFERENCES `plateforme_innovation`.`Etiquettes` (`etiquette_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `plateforme_innovation`.`Opportunites_Etiquettes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plateforme_innovation`.`Opportunites_Etiquettes` (
  `opportunite_id` INT NOT NULL,
  `etiquette_id` INT NOT NULL,
  PRIMARY KEY (`opportunite_id`, `etiquette_id`),
  INDEX `fk_Opportunites_Etiquettes_Etiquettes1_idx` (`etiquette_id` ASC) VISIBLE,
  CONSTRAINT `fk_Opportunites_Etiquettes_Opportunites1`
    FOREIGN KEY (`opportunite_id`)
    REFERENCES `plateforme_innovation`.`Opportunites` (`opportunite_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Opportunites_Etiquettes_Etiquettes1`
    FOREIGN KEY (`etiquette_id`)
    REFERENCES `plateforme_innovation`.`Etiquettes` (`etiquette_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
