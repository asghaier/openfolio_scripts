#!/usr/bin/env bash

set -ev

# Restore permissions and do the make install.
mkdir html/sites/default/files
bash scripts/openfolio/ci/restore-permissions.sh
bash scripts/openfolio/ci/drush-make-install.sh
docker exec -i openfolio_ci_web bash /var/www/scripts/openfolio/install/install_script.sh
