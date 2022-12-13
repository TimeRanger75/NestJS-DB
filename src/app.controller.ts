/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Query,
  Render,
  Param,
  Post,
  Redirect,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { CatsDto } from './cats.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async listCats(@Query('keres') keres:string){
    if(keres==null || keres.length==0){
      console.log("asd")
    const [rows]=await db.execute('SELECT * FROM macskak ORDER BY suly ASC');
    return{
      macskak:rows
    };
    }else{
      const [rows]=await db.execute('SELECT * FROM macskak WHERE szem_szin LIKE ? ORDER BY suly ASC ',[keres]);
    return{
      macskak:rows
    };
    }
  }

  @Get('macskak/new')
  @Render('new')
  newCatsForm(){
  return {};
  }

  @Post('macskak/new')
  @Redirect()
  async newMacska(@Body() macska:CatsDto){
    const [result]: any = await db.execute(
      'INSERT INTO macskak (suly, szem_szin) VALUES (?, ?)',[macska.suly, macska.szem_szin] );
      return{
       url:'/'
      };
  }
}
