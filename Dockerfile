FROM php:7.4-apache

# Enable Apache modules commonly needed for frameworks/pretty URLs
RUN a2enmod rewrite headers

# Install PHP extensions required for MySQL + common needs
RUN docker-php-ext-install pdo pdo_mysql mysqli

# Optional: set recommended PHP settings (upload limits, timezone)
# Create a custom ini to override defaults
RUN { \
  echo "upload_max_filesize=64M"; \
  echo "post_max_size=64M"; \
  echo "memory_limit=512M"; \
  echo "max_execution_time=120"; \
  echo "date.timezone=UTC"; \
} > /usr/local/etc/php/conf.d/custom.ini

# Honor APACHE_DOCUMENT_ROOT if passed in docker-compose
ARG APACHE_DOCUMENT_ROOT=/var/www/html
RUN sed -ri -e "s!/var/www/html!${APACHE_DOCUMENT_ROOT}!g" /etc/apache2/sites-available/000-default.conf /etc/apache2/apache2.conf
WORKDIR ${APACHE_DOCUMENT_ROOT}