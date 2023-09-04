var bunyan = require('bunyan');
export const logger = bunyan.createLogger(
    {
        name: 'tafia',        
        streams: [
            { level: 'trace', stream: process.stdout },
            {
                level: 'info',
                type: 'rotating-file',
                path: 'api.log',
                period: '1m',
                count: 12
            }
        ]
    });

/*
    logger.trace("Database error: " + dbError) 10
    logger.debug("Database error: " + dbError) 20
    ---------------------------------------------
    logger.info("Database error: " + dbError) 30
    logger.warn("Database error: " + dbError) 40
    logger.error("Database error: " + dbError) 50 
    logger.fatal("Database error: " + dbError) 60
*/
