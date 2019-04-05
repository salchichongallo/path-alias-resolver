const { resolvePath } = require('babel-plugin-module-resolver');

import { toPosixPath } from './utils';

export class AliasResolver
{
  protected root: string;

  protected aliases: any = {};

  protected readonly rule = /(?:require|import|export)[^'"]*(?:'|")([^'"]*)(?:'|")/gi;

  protected constructor(root: string, aliases: any = {})
  {
    this.root = root;

    this.aliases = aliases;
  }

  public static create(root: string, aliases: any = {}): AliasResolver
  {
    return new AliasResolver(root, aliases);
  }

  public resolve(filePath: string, content: string): string
  {
    let lines = content.split('\n');

    lines = lines.map((line) => this.parseLine(line, filePath));

    return lines.join('\n');
  }

  protected parseLine = (line: string, filePath: string): string =>
  {
    const transformedLine = line.replace(this.rule, (substr: string, moduleId: string): string => {

      let relativeModule = resolvePath(
        moduleId,
        filePath,
        { root: this.root, alias: this.aliases },
      );

      if (! relativeModule) {
        return substr;
      }

      relativeModule = relativeModule.replace('../', '');

      return substr.replace(moduleId, relativeModule);
    });

    return transformedLine;
  }
}
