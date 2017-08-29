import * as express from 'express';

class BaseController {
    private router: express.Router;

    constructor() {
        this.router = express.Router(); // eslint-disable-line
    }

    getRouter() {
        return this.router;
    }

    protected get(path: string, ...handlers: express.RequestHandler[]): void {
        this.router.get(path, this.handleRequest(handlers));
    }

    protected post(path: string, ...handlers: express.RequestHandler[]): void {
        this.router.post(path, this.handleRequest(handlers));
    }

    protected put(path: string, ...handlers: express.RequestHandler[]): void {
        this.router.put(path, this.handleRequest(handlers));
    }

    protected delete(path: string, ...handlers: express.RequestHandler[]): void {
        this.router.delete(path, this.handleRequest(handlers));
    }

    private handleRequest(handlers: express.RequestHandler[]): express.RequestHandler[] {
        if (handlers.length > 0) {
            let handler = handlers[handlers.length - 1];

            handlers[handlers.length - 1] = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
                let handlerResult = handler(req, res, next);
                if (!res.headersSent) {
                    if (handlerResult && typeof handlerResult['then'] === 'function')
                        handlerResult.then(data => res.send({data: data})).catch(err => {
                            res.status(400);
                            res.send({error: {message: err.message}});
                        });
                    else
                        res.send({data: handlerResult});
                }
            };

            return handlers;
        } else
            throw new Error('The router must have request handler function!');
    }
}

export default BaseController;
