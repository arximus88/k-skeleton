import { loadEnv } from 'vite';
import fs from 'fs/promises';
import path from 'path';

let env = loadEnv('mock', process.cwd(), '');

function convertProjectData(project) {
    // Конвертуємо старі поля в нові
    const convertedProject = {
        ...project,
        url_client: project.clientUrl,
        url_android: project.androidUrl,
        url_ios: project.iosUrl,
        url_project: project.projectUrl,
        url_notion: project.url,
        // Конвертуємо visible і disabled в live
        live: project.disabled ? "disabled" : (project.visible ? "live" : "inactive")
    };

    // Видаляємо старі поля
    delete convertedProject.clientUrl;
    delete convertedProject.androidUrl;
    delete convertedProject.iosUrl;
    delete convertedProject.projectUrl;
    delete convertedProject.url;
    delete convertedProject.visible;
    delete convertedProject.disabled;
    delete convertedProject.key;
    delete convertedProject.sliderFrom;
    delete convertedProject.sliderTo;

    return convertedProject;
}

async function fetchFromNocoDB() {
    const baseUrl = env.NOCODB_URL;
    const apiToken = env.NOCODB_API_KEY;
    const tableId = 'mok8y9m47n2m0pm';

    if (!baseUrl || !apiToken) {
        throw new Error('NOCODB_URL та NOCODB_API_KEY мають бути встановлені в .env файлі');
    }

    try {
        console.log('Підключення до NocoDB...');
        console.log('Base URL:', baseUrl);
        console.log('Token length:', apiToken.length);
        
        // Використовуємо v2 API
        const apiUrl = `${baseUrl}/api/v2/tables/${tableId}/records`;
        console.log('API URL:', apiUrl);

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'xc-token': apiToken,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Відповідь сервера:', errorText);
            console.error('Заголовки відповіді:', Object.fromEntries(response.headers.entries()));
            throw new Error(`HTTP помилка! статус: ${response.status}`);
        }

        const data = await response.json();
        console.log('Структура відповіді:', Object.keys(data));
        console.log(`Отримано ${data.list?.length || 0} записів`);

        // Конвертуємо дані в новий формат
        const convertedData = {
            ...data,
            list: data.list.map(convertProjectData)
        };

        // Створюємо директорію для збереження даних, якщо вона не існує
        const outputDir = path.join(process.cwd(), 'src', 'content', 'projects');
        await fs.mkdir(outputDir, { recursive: true });

        // Зберігаємо дані в JSON файл
        const outputPath = path.join(outputDir, 'nocodb-projects.json');
        await fs.writeFile(outputPath, JSON.stringify(convertedData, null, 2));
        console.log(`Дані збережено в ${outputPath}`);

        return convertedData;
    } catch (error) {
        console.error('Помилка при отриманні даних:', error.message);
        throw error;
    }
}

// Запускаємо скрипт
fetchFromNocoDB()
    .then(() => console.log('Синхронізація завершена успішно'))
    .catch(error => console.error('Помилка синхронізації:', error)); 