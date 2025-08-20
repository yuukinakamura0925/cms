FROM ruby:3.1.4

WORKDIR /app

# Install dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential \
    libpq-dev \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy Gemfile and install gems
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Copy application code
COPY . .

EXPOSE 3000

CMD ["bash", "-c", "bundle exec rails db:create && bundle exec rails db:migrate && bundle exec rails server -b 0.0.0.0"]
