'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { navAdmin, customNavAdminIcon } from '@/data/nav-path';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { getActiveMenuId, adminSlice } from '@/redux/admin';
import { MdDeleteOutline, MdModeEdit } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import FillButton from '@/components/atoms/FillButton';

const Quiz = () => {
    const { setActiveMenuId } = adminSlice.actions;
    const dispatch = useDispatch();
    const activeMenuId = useSelector(getActiveMenuId);
    const { data } = useSession();
    const token = data?.user?.token;
    const router = useRouter();

    const [users, setUsers] = useState([]);
    const [classes, setClasses] = useState([]);

    return (
        <section className='grid h-screen  w-screen grid-cols-12 bg-primary-1 py-[20px]'>
            <div className='relative col-span-2 mx-[40px] '>
                <Image alt='' src={'/images/icon-white.svg'} width={131} height={60} />
                <ul className='mt-[60px] flex flex-col  gap-6'>
                    {navAdmin.length
                        ? navAdmin.map((nav) => (
                              <li
                                  onClick={() => {
                                      dispatch(setActiveMenuId(nav.id));
                                      router.replace('/admin');
                                  }}
                                  key={nav.id}
                                  className='flex cursor-pointer items-center gap-2'>
                                  {activeMenuId === nav.id
                                      ? customNavAdminIcon({ iconName: nav.icon, isActive: true })
                                      : customNavAdminIcon({ iconName: nav.icon, isActive: false })}
                                  <span
                                      className={`${
                                          activeMenuId === nav.id ? 'text-white' : 'text-white opacity-50'
                                      } font-semibold `}>
                                      {nav.path}
                                  </span>
                              </li>
                          ))
                        : null}
                </ul>
                <button
                    type='button'
                    onClick={() => router.replace('/login')}
                    className='absolute bottom-0 flex items-center gap-2 '>
                    <AiOutlinePoweroff className='font-bold text-[#EDF3F3]' />{' '}
                    <span className='block font-semibold text-[#EDF3F3]'>Log Out</span>
                </button>
            </div>
            <div className='col-span-10  rounded-bl-[28px] rounded-tl-[28px] bg-[#EDF3F3] pl-[40px] pt-[30px]'>
                <h1 className='text-[40px] font-bold leading-[50px] '>Dashboard</h1>
                <p className='text-[16px]  '>
                    Hi Admin ! {activeMenuId === 1 ? 'Selamat Datang di Dashboard' : 'Silahkan Pilih Menu'}
                </p>

                {/* {activeMenuId === 1 ? (
                    <div className='mt-[24px] '>
                        <FillButton className='flex w-max items-center gap-5 px-[40px] py-[14px]'>
                            <AiOutlinePlus /> Tambah Data
                        </FillButton>
                        <div
                            style={{ height: 'calc(100vh - 250px)' }}
                            className='mr-[40px] mt-[20px] overflow-x-auto overflow-y-scroll rounded-[28px]  bg-white drop-shadow '>
                            <table className='w-full text-left '>
                                <thead className='sticky top-0 font-bold text-black border-b border-gray-400 bg-gray-50'>
                                    <tr>
                                        <th scope='col' className='px-6 py-4'>
                                            No
                                        </th>
                                        <th scope='col' className='px-6 py-4'>
                                            Nama
                                        </th>
                                        <th scope='col' className='px-6 py-4'>
                                            Pembelajaran
                                        </th>
                                        <th scope='col' className='px-6 py-4'>
                                            Progres
                                        </th>
                                        <th scope='col' className='px-6 py-4'>
                                            skor
                                        </th>
                                        <th scope='col' className='px-6 py-4'>
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users
                                        ? users.map((user) => (
                                              <tr key={user.id_user} className='border-b border-gray-400 '>
                                                  <th scope='row' className='px-6 py-4 font-medium text-black whitespace-nowrap'>
                                                      {user.id_user}
                                                  </th>
                                                  <td className='px-6 py-4 font-medium text-black'>{user.name}</td>
                                                  <td className='px-6 py-4 font-medium text-black'>
                                                      {user.id_user % 2 === 0 ? 'PHP' : 'JavaScript'}
                                                  </td>
                                                  <td className='px-6 py-4 font-medium text-black'>40%</td>
                                                  <td className='px-6 py-4 font-medium text-black'>80</td>
                                                  <td className='flex flex-col gap-1 px-6 py-4 font-medium text-black'>
                                                      {' '}
                                                      <button className='flex w-max items-center rounded-[4px] bg-primary-1 p-[4px] text-white'>
                                                          <MdModeEdit />
                                                          Edit
                                                      </button>
                                                      <button className='flex w-max items-center rounded-[4px] bg-alert-1 p-[4px] text-white'>
                                                          <MdDeleteOutline />
                                                          Edit
                                                      </button>
                                                  </td>
                                              </tr>
                                          ))
                                        : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : activeMenuId === 2 ? (
                    <div className='mt-[24px] flex items-center gap-5'>
                        <div className='flex w-max flex-col items-center gap-3 rounded-[20px] bg-white px-[40px] pb-[20px] pt-[14px]'>
                            <Image alt='' src={'/images/quiz.png'} height={121} width={90} />
                            <p className='font-bold'>Quiz</p>
                            <FillButton className='w-max rounded-[10px] px-[40px] py-[10px]'>Pilih</FillButton>
                        </div>
                        <div className='flex w-max flex-col items-center gap-3 rounded-[20px] bg-white px-[40px] pb-[20px] pt-[14px]'>
                            <Image alt='' src={'/images/materi.png'} height={121} width={90} />
                            <p className='font-bold'>Pembelajaran</p>
                            <FillButton
                                onClick={() => router.push('/admin/pembelajaran')}
                                className='w-max rounded-[10px] px-[40px] py-[10px]'>
                                Pilih
                            </FillButton>
                        </div>
                    </div>
                ) : null} */}
            </div>
        </section>
    );
};

export default Quiz;