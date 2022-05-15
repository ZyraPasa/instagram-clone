-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 30 Nis 2022, 11:46:19
-- Sunucu sürümü: 10.4.22-MariaDB
-- PHP Sürümü: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `insta`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(16) DEFAULT NULL,
  `password` varchar(256) DEFAULT NULL,
  `name` varchar(64) NOT NULL,
  `email` varchar(128) DEFAULT NULL,
  `admin_level` int(8) NOT NULL DEFAULT 0,
  `verified` int(1) NOT NULL DEFAULT 0,
  `avatar_url` varchar(256) DEFAULT NULL,
  `biography` varchar(128) DEFAULT NULL,
  `website` varchar(256) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `accounts`
--

INSERT INTO `accounts` (`id`, `username`, `password`, `name`, `email`, `admin_level`, `verified`, `avatar_url`, `biography`, `website`, `created`, `status`) VALUES
(1, 'accname1', '$2b$10$u.pFve/x31jrq4e/kpbcxOK/XqquZ6sFR6xI27f1ZRx5DQJu1TRga', 'Full Name', 'test@gmail.com', 0, 1, 'http://localhost:5500/1484ee67-75c8-4aee-aaab-75758560e952.png', 'Detail!', 'website.com', '2022-02-04 12:32:17', 0),
(2, 'accname2', '$2b$10$u.pFve/x31jrq4e/kpbcxOK/XqquZ6sFR6xI27f1ZRx5DQJu1TRga', 'Full Name', 'tester@gmail.com', 0, 1, 'http://localhost:5500/1484ee67-75c8-4aee-aaab-75758560e952.png', 'Detail!', 'website.com', '2022-02-04 12:32:17', 0);
-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `account_follows`
--

CREATE TABLE `account_follows` (
  `id` int(11) NOT NULL,
  `account_id` int(8) NOT NULL,
  `follow_account_id` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `account_follows`
--

INSERT INTO `account_follows` (`id`, `account_id`, `follow_account_id`) VALUES
(1, 1, 2),
(2, 2, 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(8) NOT NULL,
  `receiver_id` int(8) NOT NULL,
  `message_content` varchar(256) NOT NULL,
  `message_view` int(8) NOT NULL DEFAULT 0,
  `send_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `receiver_id`, `message_content`, `message_view`, `send_date`) VALUES
(1, 1, 2, 'Heey!', 0, '2022-02-18 08:47:45'),
(2, 1, 2, 'Hi', 0, '2022-02-18 08:47:45'),
(3, 2, 1, 'How are u?', 1, '2022-02-18 08:47:45');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `account_id` int(8) NOT NULL,
  `post_url` varchar(256) NOT NULL,
  `post_title` varchar(256) DEFAULT NULL,
  `date_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `posts`
--

INSERT INTO `posts` (`id`, `account_id`, `post_url`, `post_title`, `date_time`) VALUES
(1, 1, '/photo/300x300.png', 'Title', '2022-02-15 15:07:21'),
(2, 2, '/photo/600x400.png', 'Title123', '2022-02-15 15:07:21');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `post_comments`
--

CREATE TABLE `post_comments` (
  `id` int(11) NOT NULL,
  `account_id` int(8) NOT NULL,
  `post_id` int(8) NOT NULL,
  `comment` varchar(256) NOT NULL,
  `date_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `post_comments`
--

INSERT INTO `post_comments` (`id`, `account_id`, `post_id`, `comment`, `date_time`) VALUES
(1, 1, 1, 'Heey', '2022-02-20 08:49:43'),
(2, 2, 2, 'Good', '2022-02-20 08:49:43'),
(3, 1, 2, 'Work', '2022-02-20 08:56:45'),
(4, 2, 1, 'Whooow', '2022-02-20 08:57:06'),
(5, 1, 1, 'Puuuf', '2022-02-20 08:57:08');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `post_likes`
--

CREATE TABLE `post_likes` (
  `id` int(11) NOT NULL,
  `account_id` int(8) NOT NULL,
  `post_id` int(8) NOT NULL,
  `date_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `post_likes`
--

INSERT INTO `post_likes` (`id`, `account_id`, `post_id`, `date_time`) VALUES
(1, 1, 1, '2022-02-15 14:36:58'),
(2, 1, 2, '2022-02-15 14:41:11'),
(4, 2, 1, '2022-02-16 10:32:36');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `post_saved`
--

CREATE TABLE `post_saved` (
  `id` int(11) NOT NULL,
  `account_id` int(8) NOT NULL,
  `post_id` int(8) NOT NULL,
  `date_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `post_saved`
--

INSERT INTO `post_saved` (`id`, `account_id`, `post_id`, `date_time`) VALUES
(1, 1, 1, '2022-02-15 15:18:38'),
(2, 2, 1, '2022-02-16 09:57:18'),
(3, 2, 2, '2022-02-16 10:55:40');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('eC0DFMkRNIrtKtDKwORLJc5UE8YarjsS', 1643899267, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `account_follows`
--
ALTER TABLE `account_follows`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `post_comments`
--
ALTER TABLE `post_comments`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `post_likes`
--
ALTER TABLE `post_likes`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `post_saved`
--
ALTER TABLE `post_saved`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Tablo için AUTO_INCREMENT değeri `account_follows`
--
ALTER TABLE `account_follows`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Tablo için AUTO_INCREMENT değeri `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=219;

--
-- Tablo için AUTO_INCREMENT değeri `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Tablo için AUTO_INCREMENT değeri `post_comments`
--
ALTER TABLE `post_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Tablo için AUTO_INCREMENT değeri `post_likes`
--
ALTER TABLE `post_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Tablo için AUTO_INCREMENT değeri `post_saved`
--
ALTER TABLE `post_saved`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
