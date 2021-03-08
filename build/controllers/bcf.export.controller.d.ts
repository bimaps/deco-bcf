import { Request, Response, NextFunction } from "express";
export declare class BcfExportController {
    private project;
    private zip;
    generateBcfFile(): (req: Request, res: Response, next: NextFunction) => Promise<void>;
    private generateProjectBCF;
    private generateVersion;
    private generateTopics;
    private generateTopic;
    private generateViewpoint;
    private generateSnapshot;
}
//# sourceMappingURL=bcf.export.controller.d.ts.map