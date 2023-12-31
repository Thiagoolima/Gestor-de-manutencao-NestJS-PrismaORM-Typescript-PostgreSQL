import handlebars from 'handlebars';
import * as fs from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { SendMailOptionsDTO } from 'src/utils/dto/sendMailOptions.dto';

@Injectable()
export class CompileHandlebars {
  async readTemplate(options: SendMailOptionsDTO) {
    const data = { username: options.name, ...options };
    try {
      const fileContent = await fs.readFile(options.templatePath, 'utf-8');
      const compiledTemplate = handlebars.compile(fileContent);
      const renderTemplate = compiledTemplate(data);
      return renderTemplate;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao ler ou compilar o template.');
    }
  }
}
