import React from 'react';
import styles from './StartPage.module.scss';


const StartPage = () => {
    return (
        <div className={styles.descContainer}>
            <div>
                <h2>О проекте</h2>
                <div>Полноценное веб-приложение интернет-магазина с каталогом товаров, корзиной, избранным и админ-панелью для управления
                    ассортиментом.
                </div>
            </div>

            <div>
                <h2>Архитектура</h2>
                <ul>
                    <li>Frontend + Backend — раздельные части, деплой на Render.com</li>
                    <li>Хранение изображений — Yandex Object Storage</li>
                    <li>Серверная загрузка файлов — multer + @aws-sdk/client-s3</li>
                    <li>REST API для взаимодействия фронта и сервера</li>
                </ul>
            </div>

            <div>
                <h2>Используемые технологии</h2>
                <div className={styles.techBlock}>
                    <div>
                        <h3>Frontend</h3>
                        <div>React · TypeScript · Axios · Ant Design</div>
                    </div>
                    <div>
                        <h3>Backend</h3>
                        <div>Node.js · Express · TypeScript</div>
                    </div>
                    <div>
                        <h3>Storage</h3>
                        <div>Yandex Object Storage (S3-совместимый)</div>
                    </div>
                </div>
            </div>

            <div>
                <h2>Основной функционал</h2>
                <ul>
                    <li>Каталог товаров с карточками и галереями</li>
                    <li>Добавление в корзину и избранное</li>
                    <li>Админ-панель: создание товаров, редактирование, удаление, загрузка изображений</li>
                    <li>Адаптивный интерфейс</li>
                </ul>
            </div>

            <div>
                <h2>Деплой</h2>
                <div>Проект размещён на Render.com (frontend + backend).</div>
            </div>
        </div>
    );
};

export default StartPage;