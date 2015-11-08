/**
 * Author: Bruno Grieder
 */

module.exports = function ( grunt ) {

    // load the task
    grunt.loadNpmTasks( 'grunt-ts' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );

    // Configure grunt here
    grunt.initConfig( {

        clean: {
            dev: ['gen'],
            release: ['gen']
        },

        ts: {
            dev: {
                tsconfig: true
            },
            release: {
                tsconfig: true
            }
        }


    } );

    grunt.registerTask( "dev", ['clean:dev', 'ts:dev'] );

};
