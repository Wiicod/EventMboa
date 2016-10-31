/**
 * Created by Thedward on 31/10/2016.
 */

module.exports=function(grunt){

    grunt.loadNpmTasks('grunt-angular-gettext');

    grunt.initConfig({
        nggettext_extract:{
            pot:{
                files:{
                    'public/po/template.pot':['**/*.html']
                }
            }
        },
        nggettext_compile:{
            all:{
                files:{
                    'public/js/app_js/translation.js':['public/po/*.po']
                }
            }
        }
    });
};