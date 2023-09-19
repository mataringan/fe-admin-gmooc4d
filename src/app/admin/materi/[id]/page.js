'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { navAdmin, customNavAdminIcon } from '@/data/nav-path';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { getActiveMenuId, adminSlice } from '@/redux/admin';
import { MdDeleteOutline, MdModeEdit, MdSearch } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import FillButton from '@/components/atoms/FillButton';
import BorderedButton from '@/components/atoms/BorderedButton';
import DeletAdminNotif from '@/components/organism/DeletAdminNotif';
import {
    adminCreateClassApi,
    adminCreateMateriApi,
    adminGetAllClassApi,
    adminGetAllLevelKelasApi,
    adminGetMateriByIdApi,
    adminUpdateMateriApi,
} from '@/axios/admin';

const EditMateri = () => {
    const [notif, setNotif] = useState(false);

    const [name, setName] = useState();
    const [materi, setMateri] = useState();
    const [url, setURL] = useState();
    const [durasi, setDurasi] = useState('00.54');
    const [poin, setPoin] = useState();
    const [classes, setClasses] = useState([]);
    const [dataMateri, setDataMateri] = useState([]);
    const [idKelas, setIdKelas] = useState(0);

    const { setActiveMenuId } = adminSlice.actions;
    const dispatch = useDispatch();
    const activeMenuId = useSelector(getActiveMenuId);
    const { data } = useSession();
    const token = data?.user?.token;
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        if (token) {
            adminGetAllClassApi({ token }).then((res) => {
                setClasses(res.data);
            });
            adminGetMateriByIdApi({ token, id_materi: id }).then((res) => {
                // console.log(res);
                setDataMateri(res.data);
                setIdKelas(res.data.id_kelas);
                setURL(res.data.url);
            });
        }
    }, [token]);

    const handleUpdateMateri = async (e) => {
        e.preventDefault();
        try {
            // const resPoin = Number(poin);
            const response = await adminUpdateMateriApi({
                id_materi: id,
                token,
                id_kelas: idKelas,
                url,
                durasi,
                materi,
                name,
                poin,
            });
            console.log(response);
            // router.push('/admin/kelas');
        } catch (error) {
            console.log(error);
        }
    };

    // console.log(idKelas);

    const selectedClassName = classes.find((item) => item.id_kelas === dataMateri.id_kelas)?.name;

    const handleNotif = () => setNotif(!notif);
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
                    <span className='block font-semibold text-[#EDF3F3]'>Keluar</span>
                </button>
            </div>
            <div className='col-span-10  rounded-bl-[28px] rounded-tl-[28px] bg-[#EDF3F3] pl-[4n0px] pt-[30px]'>
                <div className='flex items-center gap-3 '>
                    <span className='cursor-pointer font-bold' onClick={() => router.replace('/admin')}>
                        Admin
                    </span>{' '}
                    <span className='font-bold'>{'>'}</span>{' '}
                    <span className='cursor-pointer font-bold' onClick={() => router.replace('/admin/pembelajaran')}>
                        {' '}
                        List Kelas
                    </span>{' '}
                    <span className='font-bold'>{'>'}</span> <span> Tambah Materi</span>
                </div>
                {token ? (
                    <div style={{ height: 'calc(100vh - 220px)' }} className='mr-[40px] mt-[40px]  '>
                        {dataMateri !== null ? (
                            <div className='w-max rounded-[28px] bg-white px-[54px] py-[40px] drop-shadow'>
                                <h1 className='text-[20px] font-bold leading-[20px]'>Tambah Materi</h1>
                                <form className='mt-[20px] flex flex-col gap-3' onSubmit={handleUpdateMateri}>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor=''>
                                            Nama Materi <span className='text-alert-1'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            className='w-full cursor-pointer appearance-none rounded-[10px]   bg-[#EDF3F3] py-1 font-monsterrat outline-none'
                                            onChange={(e) => setName(e.target.value)}
                                            defaultValue={dataMateri.name}
                                        />
                                    </div>
                                    <div className='fladminCreateClassApi({ name, description, image });ex flex-col gap-1'>
                                        <label htmlFor=''>
                                            Kelas <span className='text-alert-1'>*</span>
                                        </label>
                                        <select
                                            onChange={(e) => setIdKelas(e.target.value)}
                                            name=''
                                            id=''
                                            className='w-full cursor-pointer appearance-none rounded-[10px]   bg-[#EDF3F3] py-1 font-monsterrat outline-none'
                                            value={idKelas}>
                                            {classes.map((item) => (
                                                <option key={item.id_kelas} value={item.id_kelas}>
                                                    {selectedClassName && item.id_kelas === dataMateri.id_kelas
                                                        ? `${selectedClassName}`
                                                        : item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor=''>
                                            Materi <span className='text-alert-1'>*</span>
                                        </label>
                                        <textarea
                                            name=''
                                            id=''
                                            cols='30'
                                            rows='5'
                                            className='border p-2'
                                            onChange={(e) => setMateri(e.target.value)}
                                            defaultValue={dataMateri.materi}></textarea>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor=''>
                                            URL <span className='text-alert-1'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            className='w-full cursor-pointer appearance-none rounded-[10px]   bg-[#EDF3F3] py-1 font-monsterrat outline-none'
                                            defaultValue={dataMateri.url}
                                            onChange={(e) => setURL(e.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor=''>
                                            Poin <span className='text-alert-1'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            className='w-full cursor-pointer appearance-none rounded-[10px]   bg-[#EDF3F3] py-1 font-monsterrat outline-none'
                                            defaultValue={dataMateri.poin}
                                            onChange={(e) => setPoin(e.target.value)}
                                        />
                                    </div>

                                    <button type='submit'>Submit</button>
                                </form>
                            </div>
                        ) : (
                            <p>Data sedang dimuat</p>
                        )}

                        <iframe
                            width='560'
                            height='315'
                            src={url}
                            title='YouTube video player'
                            // frameborder='0'
                            // allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        ></iframe>
                    </div>
                ) : (
                    <p>data sedang dimuat...</p>
                )}
            </div>
            <DeletAdminNotif isVisible={notif} handleVisible={handleNotif} time={2000} />
        </section>
    );
};

export default EditMateri;
