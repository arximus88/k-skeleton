import { loadEnv } from 'vite';
import fs from 'fs/promises';
import path from 'path';

let env = loadEnv('mock', process.cwd(), '');

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

        // Створюємо директорію для збереження даних, якщо вона не існує
        const outputDir = path.join(process.cwd(), 'src', 'content', 'projects');
        await fs.mkdir(outputDir, { recursive: true });

        // Зберігаємо дані в JSON файл
        const outputPath = path.join(outputDir, 'nocodb-projects.json');
        await fs.writeFile(outputPath, JSON.stringify(data, null, 2));
        console.log(`Дані збережено в ${outputPath}`);

        return data;
    } catch (error) {
        console.error('Помилка при отриманні даних:', error.message);
        throw error;
    }
}

// Запускаємо скрипт
fetchFromNocoDB()
    .then(() => console.log('Синхронізація завершена успішно'))
    .catch(error => console.error('Помилка синхронізації:', error)); 