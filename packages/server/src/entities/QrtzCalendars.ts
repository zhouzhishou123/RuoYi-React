import { Column, Entity } from 'typeorm';

@Entity('QRTZ_CALENDARS', { schema: 'ry-vue' })
export class QrtzCalendars {
  @Column('varchar', {
    primary: true,
    name: 'sched_name',
    comment: '调度名称',
    length: 120,
  })
  schedName: string;

  @Column('varchar', {
    primary: true,
    name: 'calendar_name',
    comment: '日历名称',
    length: 200,
  })
  calendarName: string;

  @Column('blob', { name: 'calendar', comment: '存放持久化calendar对象' })
  calendar: Buffer;
}
