#!/usr/bin/env bash

set -ev

# Install the site in version X.
docker exec -i openfolio_ci_web bash /var/www/scripts/openfolio/install/install_script.sh
bash scripts/openfolio/ci/restore-permissions.sh
# Update composer to version Y.
rm -f composer.lock && composer require goalgorilla/openfolio:dev-${2}#${3} --update-with-dependencies
bash scripts/openfolio/ci/restore-permissions.sh
docker exec -i openfolio_ci_web bash /var/www/scripts/openfolio/install/update.sh
