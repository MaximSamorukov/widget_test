# WordPress Integration Guide

## Обзор

Этот виджет можно легко интегрировать в WordPress, загрузив его через CDN (jsDelivr + GitHub). Виджет автоматически инициализируется при загрузке страницы.

## Шаг 1: Сборка виджета

Соберите production-версию виджета:

```bash
npm run build
```

Это создаст два файла в папке `dist/`:
- `form-widget.js` (~673 KB, ~204 KB gzipped) - JavaScript с React и всеми зависимостями
- `form-widget.css` (~45 KB, ~4.4 KB gzipped) - Стили виджета

## Шаг 2: Публикация на GitHub

1. **Закоммитьте файлы из `dist/`** в ваш GitHub репозиторий:
   ```bash
   git add dist/
   git commit -m "Build widget for CDN"
   git push
   ```

2. **Создайте релиз** (опционально, но рекомендуется):
   - Перейдите в GitHub → Releases → Create new release
   - Укажите версию (например, `v1.0.0`)
   - Опубликуйте релиз

## Шаг 3: Получение CDN ссылок

После публикации на GitHub, файлы будут доступны через jsDelivr CDN:

### Формат URL для последней версии (main branch):
```
https://cdn.jsdelivr.net/gh/ВАШ_USERNAME/ВАШ_REPO@main/dist/form-widget.js
https://cdn.jsdelivr.net/gh/ВАШ_USERNAME/ВАШ_REPO@main/dist/form-widget.css
```

### Формат URL для конкретной версии (рекомендуется):
```
https://cdn.jsdelivr.net/gh/ВАШ_USERNAME/ВАШ_REPO@v1.0.0/dist/form-widget.js
https://cdn.jsdelivr.net/gh/ВАШ_USERNAME/ВАШ_REPO@v1.0.0/dist/form-widget.css
```

**Замените:**
- `ВАШ_USERNAME` на ваш GitHub username
- `ВАШ_REPO` на название репозитория
- `v1.0.0` на номер вашего релиза

## Шаг 4: Интеграция в WordPress

### Вариант А: Через HTML блок Gutenberg

1. В редакторе страницы добавьте блок **"Custom HTML"** (Пользовательский HTML)
2. Вставьте следующий код:

```html
<!-- Стили виджета -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ВАШ_USERNAME/ВАШ_REPO@v1.0.0/dist/form-widget.css">

<!-- Контейнер для виджета -->
<div id="form_widget"></div>

<!-- Скрипт виджета -->
<script src="https://cdn.jsdelivr.net/gh/ВАШ_USERNAME/ВАШ_REPO@v1.0.0/dist/form-widget.js"></script>
```

### Вариант Б: Через functions.php темы

Добавьте в `functions.php` вашей темы:

```php
function enqueue_form_widget() {
    // Только на нужных страницах (например, страница с slug 'contact')
    if (is_page('contact')) {
        wp_enqueue_style(
            'form-widget-css',
            'https://cdn.jsdelivr.net/gh/ВАШ_USERNAME/ВАШ_REPO@v1.0.0/dist/form-widget.css',
            array(),
            '1.0.0'
        );
        
        wp_enqueue_script(
            'form-widget-js',
            'https://cdn.jsdelivr.net/gh/ВАШ_USERNAME/ВАШ_REPO@v1.0.0/dist/form-widget.js',
            array(),
            '1.0.0',
            true // загружать в footer
        );
    }
}
add_action('wp_enqueue_scripts', 'enqueue_form_widget');
```

Затем в шаблоне страницы или через HTML блок добавьте:

```html
<div id="form_widget"></div>
```

### Вариант В: Через шорткод

Добавьте в `functions.php`:

```php
function form_widget_shortcode() {
    // Подключаем стили и скрипты
    wp_enqueue_style(
        'form-widget-css',
        'https://cdn.jsdelivr.net/gh/ВАШ_USERNAME/ВАШ_REPO@v1.0.0/dist/form-widget.css',
        array(),
        '1.0.0'
    );
    
    wp_enqueue_script(
        'form-widget-js',
        'https://cdn.jsdelivr.net/gh/ВАШ_USERNAME/ВАШ_REPO@v1.0.0/dist/form-widget.js',
        array(),
        '1.0.0',
        true
    );
    
    // Возвращаем контейнер
    return '<div id="form_widget"></div>';
}
add_shortcode('form_widget', 'form_widget_shortcode');
```

Теперь можно использовать шорткод `[form_widget]` в любом месте WordPress.

## Локальное тестирование

Перед публикацией на GitHub протестируйте виджет локально:

```bash
# Откройте test-wordpress.html в браузере
open test-wordpress.html
# или
xdg-open test-wordpress.html
```

## Обновление виджета

Когда нужно обновить виджет:

1. Внесите изменения в код
2. Соберите новую версию: `npm run build`
3. Закоммитьте: `git add dist/ && git commit -m "Update widget"`
4. Создайте новый релиз с новой версией (например, `v1.0.1`)
5. Обновите URL в WordPress на новую версию

## Кэширование jsDelivr

jsDelivr кэширует файлы на 7 дней. Чтобы обновления применились сразу:

- **Используйте версионирование** (рекомендуется): `@v1.0.1`, `@v1.0.2` и т.д.
- Или добавьте параметр для сброса кэша: `?v=timestamp`

## Troubleshooting

### Виджет не появляется

1. **Проверьте консоль браузера** (F12) на наличие ошибок
2. **Убедитесь, что контейнер существует**: `<div id="form_widget"></div>`
3. **Проверьте, что скрипты загрузились**: во вкладке Network должны быть `form-widget.js` и `form-widget.css`

### Конфликт стилей с темой WordPress

Если стили виджета конфликтуют с темой:

1. Добавьте обёртку с уникальным классом:
   ```html
   <div class="my-widget-wrapper">
     <div id="form_widget"></div>
   </div>
   ```

2. Добавьте изолирующие стили:
   ```css
   .my-widget-wrapper {
     all: initial;
     * {
       all: unset;
     }
   }
   ```

### Ошибка "Container not found"

Убедитесь, что:
- Контейнер `<div id="form_widget"></div>` находится **выше** скрипта
- Или скрипт загружается в footer (если используете `wp_enqueue_script`)

## Размер файлов

- **JavaScript**: ~673 KB (~204 KB gzipped)
- **CSS**: ~45 KB (~4.4 KB gzipped)

Виджет включает все зависимости (React, React DOM, React Aria Components), поэтому не требует дополнительных библиотек.

## Безопасность

- jsDelivr автоматически предоставляет HTTPS
- Файлы кэшируются на CDN для быстрой загрузки
- Используйте конкретные версии (`@v1.0.0`) вместо `@main` для стабильности
